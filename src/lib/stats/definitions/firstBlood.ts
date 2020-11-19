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
    const drewFirstBlood = firstStock.opponentIndex === playerIndex;
    if (drewFirstBlood) {
      // console.log(`player ${playerIndex} drew first blood in game ${i + 1}`);
      // console.log(`first blood for game ${i + 1} and player ${playerIndex}: `, firstStock);
      return firstStock;
    } else {
      // console.log(`player ${playerIndex} did not draw first blood in game ${i + 1}`);
      return null;
    }
  });
  const firstBloodCount = firstBloodStocks.reduce((count, item) => (item !== null ? count + 1 : count), 0);
  const ratio = firstBloodCount / firstBloodStocks.length;
  const percentage = ratio * 100;
  // console.log(
  //   `out of ${
  //     games.length
  //   } games, player ${playerIndex} drew first blood ${firstBloodCount} times (${percentage.toFixed(2)}%)`
  // );

  const simple = {
    text: `${percentage.toFixed(0)}%`,
    number: ratio,
  };

  return {
    result: firstBloodStocks,
    simple,
  };
};
