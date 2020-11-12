/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { GameResult } from "components/GameResult";
import { useParam } from "lib/hooks";
import React from "react";

export interface GameDisplayProps {
  total: number;
}

const Game: React.FC<{
  index: number;
}> = ({ index }) => {
  const [gameInfo] = useParam(`g${index}`);
  // The game info starts off undefined
  if (!gameInfo) {
    return null;
  }

  console.log(`game info: ${gameInfo}`);
  const [stageId, duration, char1, color1, res1, char2, color2, res2] = gameInfo.split(",");
  return (
    <GameResult
      stageId={stageId}
      duration={duration}
      char1={char1}
      color1={color1}
      result1={res1}
      char2={char2}
      color2={color2}
      result2={res2}
    />
  );
};

export const GameDisplay: React.FC<GameDisplayProps> = ({ total }) => {
  const games = [];
  for (let i = 1; i <= total; i++) {
    games.push(<Game key={`g${i}`} index={i} />);
  }
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(${total}, 1fr);
        justify-items: center;
      `}
    >
      {games}
    </div>
  );
};
