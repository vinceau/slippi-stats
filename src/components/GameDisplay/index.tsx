/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { GameInfo } from "lib/hooks";
import React from "react";

import { GameResult } from "./GameResult";

export const GameDisplay: React.FC<{
  games: Array<GameInfo | null>;
  updateGameInfo: (gameNumber: number, gameInfo: Partial<GameInfo>) => void;
  leftColor: string;
  rightColor: string;
  winningSide?: string;
}> = (props) => {
  return (
    <div
      css={css`
        display: grid;
        grid-column-gap: 2rem;
        grid-template-columns: repeat(${props.games.length}, 1fr);
        justify-items: center;
      `}
    >
      {props.games.map((game, i) => (
        <GameResult
          key={`game${i}`}
          gameInfo={game}
          onGameInfoChange={(info) => props.updateGameInfo(i + 1, info)}
          leftColor={props.leftColor}
          rightColor={props.rightColor}
          winningSide={props.winningSide}
        />
      ))}
    </div>
  );
};
