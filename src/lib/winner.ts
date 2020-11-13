import { FrameEntryType } from "@slippi/slippi-js";

/**
 * Given the last frame of the game, determine the winner first based on stock count
 * then based on remaining percent.
 * If percents are tied, return null;
 *
 * @returns the player index of the winner
 */
export const findWinner = (lastFrame: FrameEntryType): number | null => {
  const postFrameEntries = Object.keys(lastFrame.players).map((i: any) => (lastFrame.players[i] as any).post);
  const winnerPostFrame = postFrameEntries.reduce((a, b) => {
    // Determine winner based on stock count
    if (a.stocksRemaining > b.stocksRemaining) {
      return a;
    }
    if (a.stocksRemaining < b.stocksRemaining) {
      return b;
    }

    // Stocks are the same so determine winner based off remaining percent
    if (a.percent < b.percent) {
      return a;
    }
    if (a.percent > b.percent) {
      return b;
    }

    // Just return null if no winner
    return null;
  });

  return winnerPostFrame.playerIndex;
};
