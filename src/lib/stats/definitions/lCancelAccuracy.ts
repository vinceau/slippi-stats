import { StatDefinition } from "../types";

export const lCancelAccuracy: StatDefinition = {
  name: "L-Cancel Accuracy",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 0,
  calculate(games, playerIndex) {
    const lCancelsPerGame = games.map((game) => {
      const actionCounts = game.stats.actionCounts.find((counts) => counts.playerIndex === playerIndex);
      if (!actionCounts) {
        return {
          success: 0,
          fail: 0,
        };
      }

      return actionCounts.lCancelCount;
    });

    const totalLCancels = lCancelsPerGame.reduce(
      (tally, val) => ({
        success: tally.success + val.success,
        fail: tally.fail + val.fail,
      }),
      { success: 0, fail: 0 }
    );
    const ratio = totalLCancels.success / (totalLCancels.success + totalLCancels.fail);

    return {
      result: totalLCancels,
      simple: {
        text: isNaN(ratio) ? "N/A" : `${(ratio * 100).toFixed(this.recommendedRounding)}%`,
        number: ratio,
      },
    };
  },
};
