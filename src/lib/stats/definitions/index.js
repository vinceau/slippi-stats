/* eslint-disable */

/*
 * Taken from: https://github.com/project-slippi/slippi-set-stats/blob/master/main.js
 */

const { moves: moveUtil } = require("@slippi/slippi-js");
const _ = require("lodash");

export * from "./firstBlood";
export * from "./lCancelAccuracy";
export * from "./neutralOpenerMoves";

export const openingsPerKill = {
  name: "Openings / Kill",
  type: "number",
  betterDirection: "lower",
  recommendedRounding: 1,
  calculate(games, playerIndex) {
    return genOverallRatioStat(games, playerIndex, "openingsPerKill", this.recommendedRounding);
  },
};

export const damagePerOpening = {
  name: "Damage / Opening",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 1,
  calculate(games, playerIndex) {
    return genOverallRatioStat(games, playerIndex, "damagePerOpening", this.recommendedRounding);
  },
};

export const neutralWins = {
  name: "Neutral Wins",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 0,
  calculate(games, playerIndex) {
    return genOverallRatioStat(games, playerIndex, "neutralWinRatio", this.recommendedRounding, "count");
  },
};

export const killMoves = {
  name: "Most Common Kill Move",
  type: "text",
  calculate(games, playerIndex) {
    const killMoves = _.flatMap(games, (game) => {
      const conversions = _.get(game, ["stats", "conversions"]) || [];
      const conversionsForPlayer = _.filter(conversions, (conversion) => {
        const isForPlayer = conversion.playerIndex === playerIndex;
        const didKill = conversion.didKill;
        return isForPlayer && didKill;
      });

      return _.map(conversionsForPlayer, (conversion) => {
        return _.last(conversion.moves);
      });
    });

    const killMovesByMove = _.groupBy(killMoves, "moveId");
    const killMoveCounts = _.map(killMovesByMove, (moves) => {
      const move = _.first(moves);
      return {
        count: moves.length,
        id: move.moveId,
        name: moveUtil.getMoveName(move.moveId),
        shortName: moveUtil.getMoveShortName(move.moveId),
      };
    });

    const orderedKillMoveCounts = _.orderBy(killMoveCounts, ["count"], ["desc"]);
    const topKillMove = _.first(orderedKillMoveCounts);
    let simpleText = "N/A";
    if (topKillMove) {
      simpleText = `${topKillMove.shortName} - ${topKillMove.count}`;
    }

    return {
      result: orderedKillMoveCounts,
      simple: {
        text: simpleText.toUpperCase(),
      },
    };
  },
};

export const earlyKills = {
  name: "Earliest Kill",
  type: "number",
  betterDirection: "lower",
  recommendedRounding: 1,
  calculate(games, playerIndex) {
    const oppStocks = _.flatMap(games, (game) => {
      const stocks = _.get(game, ["stats", "stocks"]) || [];
      return _.filter(stocks, (stock) => {
        const isOpp = stock.playerIndex !== playerIndex;
        const hasEndPercent = stock.endPercent !== null;
        return isOpp && hasEndPercent;
      });
    });

    const orderedOppStocks = _.orderBy(oppStocks, ["endPercent"], ["asc"]);
    const earliestKillStock = _.first(orderedOppStocks);
    const simple = {
      text: "N/A",
      number: null,
    };

    if (earliestKillStock) {
      simple.number = earliestKillStock.endPercent;
      simple.text = simple.number.toFixed(this.recommendedRounding);
    }

    return {
      result: _.take(orderedOppStocks, 5),
      simple: simple,
    };
  },
};

export const lateDeaths = {
  name: "Latest Death",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 0,
  calculate(games, playerIndex) {
    const playerStocks = _.flatMap(games, (game) => {
      const stocks = _.get(game, ["stats", "stocks"]) || [];
      return _.filter(stocks, (stock) => {
        const isPlayer = stock.playerIndex === playerIndex;
        const hasEndPercent = stock.endPercent !== null;
        return isPlayer && hasEndPercent;
      });
    });

    const orderedPlayerStocks = _.orderBy(playerStocks, ["endPercent"], ["desc"]);
    const latestDeathStock = _.first(orderedPlayerStocks);
    const simple = {
      text: "N/A",
      number: null,
    };

    if (latestDeathStock) {
      simple.number = latestDeathStock.endPercent;
      simple.text = simple.number.toFixed(this.recommendedRounding);
    }

    return {
      result: _.take(orderedPlayerStocks, 5),
      simple: simple,
    };
  },
};

export const selfDestructs = {
  // Only show this one if greater than 2 for one player
  name: "Total Self-Destructs",
  type: "number",
  betterDirection: "lower",
  recommendedRounding: 0,
  calculate(games, playerIndex) {
    const sdCounts = _.map(games, (game) => {
      const stocks = _.get(game, ["stats", "stocks"]) || [];
      const playerEndedStocks = _.filter(stocks, (stock) => {
        const isPlayer = stock.playerIndex === playerIndex;
        const hasEndPercent = stock.endPercent !== null;
        return isPlayer && hasEndPercent;
      });

      const conversions = _.get(game, ["stats", "conversions"]) || [];
      const oppKillConversions = _.filter(conversions, (conversion) => {
        const isOpp = conversion.playerIndex !== playerIndex;
        const didKill = conversion.didKill;
        return isOpp && didKill;
      });

      return playerEndedStocks.length - oppKillConversions.length;
    });

    const sdSum = _.sum(sdCounts);

    return {
      result: sdSum,
      simple: {
        number: sdSum,
        text: `${sdSum}`,
      },
    };
  },
};

export const inputsPerMinute = {
  name: "Inputs / Minute",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 0,
  calculate(games, playerIndex) {
    return genOverallRatioStat(games, playerIndex, "inputsPerMinute", this.recommendedRounding);
  },
};

export const averageKillPercent = {
  name: "Average Kill Percent",
  type: "number",
  betterDirection: "lower",
  recommendedRounding: 0,
  calculate(games, playerIndex) {
    const oppStocks = _.flatMap(games, (game) => {
      const stocks = _.get(game, ["stats", "stocks"]) || [];
      return _.filter(stocks, (stock) => {
        const isOpp = stock.playerIndex !== playerIndex;
        const hasEndPercent = stock.endPercent !== null;
        return isOpp && hasEndPercent;
      });
    });

    const result = {
      total: oppStocks.length,
      count: _.sumBy(oppStocks, "endPercent") || 0,
    };

    result.ratio = result.total ? result.count / result.total : null;

    return {
      result: result,
      simple: genSimpleFromRatio(result, this.recommendedRounding),
    };
  },
};

export const highDamagePunishes = {
  name: "Highest Damage Punish",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 1,
  calculate(games, playerIndex) {
    const punishes = _.flatMap(games, (game) => {
      const conversions = _.get(game, ["stats", "conversions"]) || [];
      return _.filter(conversions, (conversion) => {
        const isForPlayer = conversion.playerIndex === playerIndex;
        const hasEndPercent = conversion.endPercent !== null;
        return isForPlayer && hasEndPercent;
      });
    });

    const getDamageDone = (punish) => punish.endPercent - punish.startPercent;
    const orderedPunishes = _.orderBy(punishes, [getDamageDone], "desc");
    const topPunish = _.first(orderedPunishes);
    const simple = {
      text: "N/A",
      number: null,
    };

    if (topPunish) {
      simple.number = getDamageDone(topPunish);
      simple.text = simple.number.toFixed(this.recommendedRounding);
    }

    return {
      result: _.take(orderedPunishes, 5),
      simple: simple,
    };
  },
};

export const damageDone = {
  name: "Total Damage Done",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 0,
  calculate(games, playerIndex) {
    return genOverallRatioStat(games, playerIndex, "damagePerOpening", this.recommendedRounding, "count");
  },
};

function genOverallRatioStat(games, playerIndex, field, fixedNum, type = "ratio") {
  const statRatios = _.map(games, (game) => {
    const overallStats = _.get(game, ["stats", "overall"]);
    const overallStatsByPlayer = _.keyBy(overallStats, "playerIndex");
    const overallStatsForPlayer = overallStatsByPlayer[playerIndex];
    return overallStatsForPlayer[field];
  });

  const avg = averageRatios(statRatios);
  const simple = genSimpleFromRatio(avg, fixedNum, type);

  return {
    result: avg,
    simple: simple,
  };
}

function averageRatios(ratios) {
  const result = {};

  result.count = _.sumBy(ratios, "count") || 0;
  result.total = _.sumBy(ratios, "total") || 0;
  result.ratio = result.total ? result.count / result.total : null;

  return result;
}

function genSimpleFromRatio(ratio, fixedNum, type = "ratio") {
  const result = {};

  switch (type) {
    case "ratio":
      result.number = ratio.ratio;
      result.text = ratio.ratio !== null ? ratio.ratio.toFixed(fixedNum) : "N/A";
      break;
    case "count":
      result.number = ratio.count;
      result.text = ratio.count.toFixed(fixedNum);
      break;
  }

  return result;
}
