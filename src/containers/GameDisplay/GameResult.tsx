/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { HeadToHead } from "components/HeadToHead";
import { StageTimer } from "components/StageTimer";
import { useGameInfo } from "lib/hooks";
import React from "react";

export interface GameResultProps {
  index: number;
  leftColor: string;
  rightColor: string;
  winningSide?: string;
}

const switchResult = (res: string): string => {
  return res === "winner" ? "loser" : res === "loser" ? "winner" : res;
};

export const GameResult: React.FC<GameResultProps> = (props) => {
  const [gameInfo, setGameInfo] = useGameInfo(props.index);
  if (!gameInfo) {
    return null;
  }

  const gameWinner = gameInfo.result1 === "winner" ? "left" : gameInfo.result2 === "winner" ? "right" : "";
  const highlight = props.winningSide === gameWinner;

  const { stageId, duration, ...rest } = gameInfo;
  const borderColor = `rgba(255, 255, 255, ${highlight ? 1 : 0.2})`;

  const onClick = () => {
    setGameInfo({
      result1: switchResult(gameInfo.result1),
      result2: switchResult(gameInfo.result2),
    });
  };

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
      <HeadToHead
        onClick={onClick}
        leftColor={props.leftColor}
        rightColor={props.rightColor}
        borderColor={borderColor}
        {...rest}
      />
      <StageTimer stageId={stageId} duration={duration} borderColor={borderColor} />
    </div>
  );
};
