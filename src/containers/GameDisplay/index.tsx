/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { GameResult } from "components/GameResult";
import { useParam } from "lib/hooks";
import React from "react";

const Game: React.FC<{
  index: number;
  leftColor: string;
  rightColor: string;
  winningSide?: string;
}> = ({ index, leftColor, rightColor, winningSide }) => {
  const [gameInfo] = useParam(`g${index}`);
  // The game info starts off undefined
  if (!gameInfo) {
    return null;
  }
  const [stageId, duration, char1, color1, res1, char2, color2, res2] = gameInfo.split(",");
  const gameWinner = res1 === "winner" ? "left" : res2 === "winner" ? "right" : "";
  return (
    <GameResult
      highlight={winningSide === gameWinner}
      stageId={stageId}
      duration={duration}
      char1={char1}
      color1={color1}
      result1={res1}
      char2={char2}
      color2={color2}
      result2={res2}
      leftColor={leftColor}
      rightColor={rightColor}
    />
  );
};

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
      <Game
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
