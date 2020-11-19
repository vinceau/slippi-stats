import _ from "lodash";

import { StatCalculation } from "../types";

export const calculateFirstBlood: StatCalculation = (games, playerIndex) => {
  // For each game return either the first blood stock if taken or null if lost
  const firstBloodStocks = games.map((game, i) => {
    const deathStocks = game.stats.stocks.filter((stock) => {
      const hasEndPercent = stock.endPercent !== null;
      return hasEndPercent;
    });
    const orderedDeathStocks = _.orderBy(deathStocks, ["endFrame"], ["asc"]);
    const firstStock = orderedDeathStocks[0];
    if (!firstStock || firstStock.opponentIndex !== playerIndex) {
      // console.log(`player ${playerIndex} did not draw first blood in game ${i + 1}`);
      return null;
    }
    return firstStock;
  });
  const firstBloodCount = firstBloodStocks.reduce((count, item) => (item !== null ? count + 1 : count), 0);
  const ratio = firstBloodCount / firstBloodStocks.length;

  const simple = {
    text: isNaN(ratio) ? "N/A" : `${(ratio * 100).toFixed(0)}%`,
    number: ratio,
  };

  return {
    result: firstBloodStocks,
    simple,
  };
};
