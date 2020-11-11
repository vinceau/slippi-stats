/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

import {
  DamagePerOpening,
  InputsPerMinute,
  MostCommonKillMove,
  MostCommonNeutralOpener,
  OpeningsPerKill,
  TotalDamageDone,
  AverageKillPercent,
  NeutralWins,
} from "./Statistics";

export const StatDisplay: React.FC = () => {
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
          margin: 5rem 5rem;
        `}
      >
        <MostCommonKillMove />
        <MostCommonNeutralOpener />
        <OpeningsPerKill />
        <TotalDamageDone />
        <AverageKillPercent />
        <NeutralWins />
      </div>
    </div>
  );
};
