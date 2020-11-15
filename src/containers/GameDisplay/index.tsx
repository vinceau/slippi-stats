/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParam } from "lib/hooks";
import React from "react";

import { GameResult } from "./GameResult";

export const GameDisplay: React.FC<{
  leftColor: string;
  rightColor: string;
  winningSide?: string;
}> = (props) => {
  const [gt] = useParam(`gt`);
  const total = parseInt(gt, 10) || 0;

  const games = [];
  for (let i = 1; i <= total; i++) {
    games.push(
      <GameResult
        key={`g${i}`}
        index={i}
        leftColor={props.leftColor}
        rightColor={props.rightColor}
        winningSide={props.winningSide}
      />
    );
  }

  return (
    <div
      css={css`
        display: grid;
        grid-column-gap: 2rem;
        grid-template-columns: repeat(${total}, 1fr);
        justify-items: center;
      `}
    >
      {games}
    </div>
  );
};
