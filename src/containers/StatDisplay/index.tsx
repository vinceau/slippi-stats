/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Block } from "components/Block";
import { GameDisplay } from "components/GameDisplay";
import { useGames, useParam } from "lib/hooks";
import React from "react";

import { Divider } from "./Divider";
import { StatDisplayList } from "./StatDisplayList";

const ScoreBlock = styled(Block)`
  padding: 0.5rem 4rem;
  font-size: 5rem;
  font-weight: 800;
  position: absolute;
  bottom: -6rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const StatDisplay: React.FC<{
  primaryColor: string;
  secondaryColor: string;
  leftColor: string;
  rightColor: string;
}> = (props) => {
  const { games, score, setGame } = useGames();
  const [stats, setStats] = useParam("stats");
  const winningSide = score.left > score.right ? "left" : score.right > score.left ? "right" : "";
  const { leftColor, rightColor, ...theme } = props;

  return (
    <div
      css={css`
        background: linear-gradient(to right, ${props.secondaryColor}, transparent, ${props.secondaryColor});
        width: 100%;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 100%;
          grid-row-gap: 2rem;
          margin: 4rem;
        `}
      >
        <StatDisplayList stats={stats} setStats={setStats} theme={theme} />
        <Divider />
        <GameDisplay
          games={games}
          updateGameInfo={setGame}
          winningSide={winningSide}
          leftColor={leftColor}
          rightColor={rightColor}
        />
      </div>
      <ScoreBlock color="white" backgroundColor={props.primaryColor}>
        {`${score.left} - ${score.right}`}
      </ScoreBlock>
    </div>
  );
};
