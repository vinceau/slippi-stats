/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { GameDisplay } from "../GameDisplay";
import React from "react";

import {
  AverageKillPercent,
  DamagePerOpening,
  InputsPerMinute,
  MostCommonKillMove,
  MostCommonNeutralOpener,
  NeutralWins,
  OpeningsPerKill,
  TotalDamageDone,
} from "./Statistics";

const Divider = styled.div`
  content: " ";
  display: block;
  height: 0.1rem;
  width: 100%;
  margin-top: 0.7rem;
  background-color: rgba(255, 255, 255, 0.05);
`;

export const StatDisplay: React.FC<{
  primaryColor: string;
  secondaryColor: string;
  leftColor: string;
  rightColor: string;
}> = (props) => {
  const { leftColor, rightColor, ...theme } = props;
  return (
    <div
      css={css`
        background: rgba(0, 0, 0, 0.3);
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
        <MostCommonKillMove {...theme} />
        <MostCommonNeutralOpener {...theme} />
        <Divider />
        <OpeningsPerKill {...theme} />
        <TotalDamageDone {...theme} />
        <AverageKillPercent {...theme} />
        <NeutralWins {...theme} />
        <Divider />
        <GameDisplay leftColor={leftColor} rightColor={rightColor} />
      </div>
    </div>
  );
};
