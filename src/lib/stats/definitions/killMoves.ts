import { moves as moveUtil } from "@slippi/slippi-js";
import _ from "lodash";

import { StatDefinition } from "../types";

export const killMoves: StatDefinition = {
  name: "Most Common Kill Move",
  type: "text",
  calculate(games, playerIndex) {
    const killMoves = _.flatMap(games, (game) => {
      const conversions = _.get(game, ["stats", "conversions"]) || [];
      const conversionsForPlayer = _.filter(conversions, (conversion) => {
        const isForPlayer = conversion.lastHitBy === playerIndex;
        const didKill = conversion.didKill;
        return isForPlayer && didKill;
      });

      return conversionsForPlayer.map((conversion) => _.last(conversion.moves));
    });

    const killMovesByMove = _.groupBy(killMoves, "moveId");
    const killMoveCounts = _.map(killMovesByMove, (moves) => {
      const move = moves[0];
      if (move) {
        return {
          count: moves.length,
          id: move.moveId,
          name: moveUtil.getMoveName(move.moveId),
          shortName: moveUtil.getMoveShortName(move.moveId),
        };
      }

      // Move is undefined so apparently this means it was a grab release??
      return {
        count: moves.length,
        id: -1,
        name: "Grab Release",
        shortName: "grab release",
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
