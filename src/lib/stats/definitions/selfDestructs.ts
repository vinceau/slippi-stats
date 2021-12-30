import _ from "lodash";

import { StatDefinition } from "../types";

export const selfDestructs: StatDefinition = {
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
        const isOpp = conversion.playerIndex === playerIndex;
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
