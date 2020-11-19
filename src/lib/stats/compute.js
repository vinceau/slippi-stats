/* eslint-disable */

import { calculateFirstBlood } from "./definitions/firstBlood";

/*
 * Taken from: https://github.com/project-slippi/slippi-set-stats/blob/master/main.js
 */

const { stages: stageUtil, moves: moveUtil, characters: characterUtil } = require("@slippi/slippi-js");
const _ = require("lodash");
const { findWinner } = require("../winner");
const { Stat } = require("./types");
const { convertFrameCountToDurationString } = require("../util");

export const STAT_DEFINITIONS = {
  [Stat.OPENINGS_PER_KILL]: {
    id: Stat.OPENINGS_PER_KILL,
    name: "Openings / Kill",
    type: "number",
    betterDirection: "lower",
    recommendedRounding: 1,
    calculate: (games, playerIndex) => {
      return genOverallRatioStat(games, playerIndex, "openingsPerKill", 1);
    },
  },
  [Stat.DAMAGE_PER_OPENING]: {
    id: Stat.DAMAGE_PER_OPENING,
    name: "Damage / Opening",
    type: "number",
    betterDirection: "higher",
    recommendedRounding: 1,
    calculate: (games, playerIndex) => {
      return genOverallRatioStat(games, playerIndex, "damagePerOpening", 1);
    },
  },
  [Stat.NEUTRAL_WINS]: {
    id: Stat.NEUTRAL_WINS,
    name: "Neutral Wins",
    type: "number",
    betterDirection: "higher",
    recommendedRounding: 0,
    calculate: (games, playerIndex) => {
      return genOverallRatioStat(games, playerIndex, "neutralWinRatio", 0, "count");
    },
  },
  [Stat.KILL_MOVES]: {
    id: Stat.KILL_MOVES,
    name: "Most Common Kill Move",
    type: "text",
    calculate: (games, playerIndex) => {
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
        simpleText = `${topKillMove.shortName} (${topKillMove.count})`;
      }

      return {
        result: orderedKillMoveCounts,
        simple: {
          text: simpleText,
        },
      };
    },
  },
  [Stat.NEUTRAL_OPENER_MOVES]: {
    id: Stat.NEUTRAL_OPENER_MOVES,
    name: "Most Common Neutral Opener",
    type: "text",
    calculate: (games, playerIndex) => {
      const neutralMoves = _.flatMap(games, (game) => {
        const conversions = _.get(game, ["stats", "conversions"]) || [];
        const conversionsForPlayer = _.filter(conversions, (conversion) => {
          const isForPlayer = conversion.playerIndex === playerIndex;
          const isNeutralWin = conversion.openingType === "neutral-win";
          return isForPlayer && isNeutralWin;
        });

        return _.map(conversionsForPlayer, (conversion) => {
          return _.first(conversion.moves);
        });
      });

      // TODO: This following code is repeated from kill move code, put in function

      const neutralMovesByMove = _.groupBy(neutralMoves, "moveId");
      const neutralMoveCounts = _.map(neutralMovesByMove, (moves) => {
        const move = _.first(moves);
        return {
          count: moves.length,
          id: move.moveId,
          name: moveUtil.getMoveName(move.moveId),
          shortName: moveUtil.getMoveShortName(move.moveId),
        };
      });

      const orderedNeutralMoveCounts = _.orderBy(neutralMoveCounts, ["count"], ["desc"]);
      const topNeutralMove = _.first(orderedNeutralMoveCounts);
      let simpleText = "N/A";
      if (topNeutralMove) {
        simpleText = `${topNeutralMove.shortName} (${topNeutralMove.count})`;
      }

      return {
        result: orderedNeutralMoveCounts,
        simple: {
          text: simpleText,
        },
      };
    },
  },
  [Stat.FIRST_BLOOD]: {
    id: Stat.FIRST_BLOOD,
    name: "First blood",
    type: "number",
    betterDirection: "higher",
    recommendedRounding: 0,
    calculate: (games, playerIndex) => calculateFirstBlood(games, playerIndex),
  },
  [Stat.EARLY_KILLS]: {
    id: Stat.EARLY_KILLS,
    name: "Earliest Kill",
    type: "number",
    betterDirection: "lower",
    recommendedRounding: 1,
    calculate: (games, playerIndex) => {
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
        simple.text = simple.number.toFixed(1);
      }

      return {
        result: _.take(orderedOppStocks, 5),
        simple: simple,
      };
    },
  },
  [Stat.LATE_DEATHS]: {
    id: Stat.LATE_DEATHS,
    name: "Latest Death",
    type: "number",
    betterDirection: "higher",
    recommendedRounding: 1,
    calculate: (games, playerIndex) => {
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
        simple.text = simple.number.toFixed(1);
      }

      return {
        result: _.take(orderedPlayerStocks, 5),
        simple: simple,
      };
    },
  },
  [Stat.SELF_DESTRUCTS]: {
    id: Stat.SELF_DESTRUCTS, // Only show this one if greater than 2 for one player
    name: "Total Self-Destructs",
    type: "number",
    betterDirection: "lower",
    recommendedRounding: 0,
    calculate: (games, playerIndex) => {
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
  },
  [Stat.INPUTS_PER_MINUTE]: {
    id: Stat.INPUTS_PER_MINUTE,
    name: "Inputs / Minute",
    type: "number",
    betterDirection: "higher",
    recommendedRounding: 1,
    calculate: (games, playerIndex) => {
      return genOverallRatioStat(games, playerIndex, "inputsPerMinute", 1);
    },
  },
  [Stat.AVG_KILL_PERCENT]: {
    id: Stat.AVG_KILL_PERCENT,
    name: "Average Kill Percent",
    type: "number",
    betterDirection: "lower",
    recommendedRounding: 1,
    calculate: (games, playerIndex) => {
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
        simple: genSimpleFromRatio(result, 1),
      };
    },
  },
  [Stat.HIGH_DAMAGE_PUNISHES]: {
    id: Stat.HIGH_DAMAGE_PUNISHES,
    name: "Highest Damage Punish",
    type: "number",
    betterDirection: "higher",
    recommendedRounding: 1,
    calculate: (games, playerIndex) => {
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
        simple.text = simple.number.toFixed(1);
      }

      return {
        result: _.take(orderedPunishes, 5),
        simple: simple,
      };
    },
  },
  [Stat.DAMAGE_DONE]: {
    id: Stat.DAMAGE_DONE,
    name: "Total Damage Done",
    type: "number",
    betterDirection: "higher",
    recommendedRounding: 1,
    calculate: (games, playerIndex) => {
      return genOverallRatioStat(games, playerIndex, "damagePerOpening", 1, "count");
    },
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

export function filterGames(games) {
  // console.log(games);
  const gamesByIsSingles = _.groupBy(games, (game) => {
    const numberOfPlayers = game.settings.players.length;
    return numberOfPlayers === 2;
  });

  const nonSinglesGames = _.get(gamesByIsSingles, false) || [];
  if (_.some(nonSinglesGames)) {
    console.log("The following games have been excluded because they are not singles games:");
    _.forEach(nonSinglesGames, (game) => {
      console.log(game.filePath);
    });
    console.log();
  }

  const singlesGames = _.get(gamesByIsSingles, true) || [];
  const gamesByPorts = _.chain(singlesGames)
    .groupBy((game) => {
      const ports = _.map(game.settings.players, "port");
      return _.join(ports, "-");
    })
    .orderBy(["length"], ["desc"])
    .value();

  const gamesWithSamePorts = gamesByPorts.shift();
  if (_.some(gamesByPorts)) {
    console.log("The following games have been excluded because the player ports differ:");
    const flatGames = _.flatten(gamesByPorts);
    _.forEach(flatGames, (game) => {
      console.log(game.filePath);
    });
    console.log();
  }

  if (_.isEmpty(gamesWithSamePorts)) {
    throw new Error("There were no valid games found to compute stats from.");
  }

  console.log(`Including ${gamesWithSamePorts.length} games for stat calculation...`);

  return gamesWithSamePorts;
}

function computeStats(statsList, games) {
  const firstGame = _.first(games);
  // console.log(firstGame);
  const orderIndices = _.map(firstGame.settings.players, "playerIndex");
  const reversedIndices = _.chain(orderIndices).clone().reverse().value();
  const indices = [orderIndices, reversedIndices];

  const statResults = statsList.map((statKey) => {
    const def = STAT_DEFINITIONS[statKey];
    if (!def || !def.calculate) {
      return null;
    }

    const { calculate, ...output } = def;
    const results = _.map(indices, (iIndices) => {
      const result = calculate(games, iIndices[0], iIndices[1]);
      result.port = iIndices[0] + 1;
      return result;
    });

    output.results = results;
    return output;
  });

  return statResults;
}

function generateGameInfo(games) {
  const getStartAt = (game) => game.metadata.startAt;
  const orderedGames = _.orderBy(games, [getStartAt], ["asc"]);

  const getResultForPlayer = (game, playerIndex) => {
    const latestFrame = game.latestFrame;
    const winner = findWinner(latestFrame);
    return winner === playerIndex ? "winner" : "loser";
  };

  const generatePlayerInfo = (game) => (player) => {
    // console.log(player);
    return {
      port: player.port,
      characterId: player.characterId,
      characterColor: player.characterColor,
      nametag: player.nametag,
      characterName: characterUtil.getCharacterName(player.characterId),
      characterColor: characterUtil.getCharacterColorName(player.characterId, player.characterColor),
      gameResult: getResultForPlayer(game, player.playerIndex),
    };
  };

  return _.map(orderedGames, (game) => {
    const playerInfoGen = generatePlayerInfo(game);

    return {
      stage: {
        id: game.settings.stageId,
        name: stageUtil.getStageName(game.settings.stageId),
      },
      players: _.map(game.settings.players, playerInfoGen),
      startTime: game.metadata.startAt,
      duration: convertFrameCountToDurationString(game.stats.lastFrame),
    };
  });
}

export function generateOutput(statsList, games) {
  return {
    games: generateGameInfo(games),
    summary: computeStats(statsList, games),
  };
}
