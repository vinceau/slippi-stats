import { moves as moveUtil } from "@slippi/slippi-js";
import _ from "lodash";

import { StatDefinition } from "../types";

export const neutralOpenerMoves: StatDefinition = {
  name: "Most Common Neutral Opener",
  type: "text",
  calculate(games, playerIndex) {
    const neutralMoves = _.flatMap(games, (game) => {
      const conversions = _.get(game, ["stats", "conversions"]) ?? [];
      const conversionsForPlayer = _.filter(conversions, (conversion) => {
        const isForPlayer = conversion.lastHitBy === playerIndex;
        const isNeutralWin = conversion.openingType === "neutral-win";
        return isForPlayer && isNeutralWin;
      });

      return conversionsForPlayer.filter(({ moves }) => moves.length > 0).map((conversion) => conversion.moves[0]);
    });

    // TODO: This following code is repeated from kill move code, put in function
    const neutralMovesByMove = _.groupBy(neutralMoves, "moveId");
    const neutralMoveCounts = _.map(neutralMovesByMove, (moves) => {
      const move = _.first(moves);
      const moveId = move ? move.moveId : -1;
      return {
        count: moves.length,
        id: moveId,
        name: moveUtil.getMoveName(moveId),
        shortName: moveUtil.getMoveShortName(moveId),
      };
    });

    const orderedNeutralMoveCounts = _.orderBy(neutralMoveCounts, ["count"], ["desc"]);
    const topNeutralMove = _.first(orderedNeutralMoveCounts);
    let simpleText = "N/A";
    if (topNeutralMove) {
      simpleText = `${topNeutralMove.shortName} - ${topNeutralMove.count}`;
    }

    return {
      result: orderedNeutralMoveCounts,
      simple: {
        text: simpleText.toUpperCase(),
      },
    };
  },
};
