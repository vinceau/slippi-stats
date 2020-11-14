/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

import { HeadToHead } from "./HeadToHead";
import { StageTimer } from "./StageTimer";

export interface GameResultProps {
  stageId: string;
  duration: string;
  char1: number | string;
  color1: string;
  result1: string;
  char2: number | string;
  color2: string;
  result2: string;
  leftColor: string;
  rightColor: string;
  highlight?: boolean;
}

export const GameResult: React.FC<GameResultProps> = (props) => {
  const { stageId, duration, highlight, ...rest } = props;
  const borderColor = `rgba(255, 255, 255, ${highlight ? 1 : 0.2})`;
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 100%;
        justify-items: center;
        width: 100%;
        max-width: 18rem;
        grid-row-gap: 2rem;
      `}
    >
      <HeadToHead borderColor={borderColor} {...rest} />
      <StageTimer stageId={stageId} duration={duration} borderColor={borderColor} />
    </div>
  );
};
