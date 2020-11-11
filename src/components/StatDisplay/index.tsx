/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

import { DamagePerOpening } from "./DamagePerOpening";
import { InputsPerMinute } from "./InputsPerMinute";
import { MostCommonKillMove } from "./MostCommonKillMove";
import { MostCommonNeutralOpener } from "./MostCommonNeutralOpener";
import { OpeningsPerKill } from "./OpeningsPerKill";
import { TotalDamageDone } from "./TotalDamageDone";

export const StatDisplay: React.FC = (props) => {
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
          margin: 5rem 7rem;
        `}
      >
        <MostCommonKillMove />
        <MostCommonNeutralOpener />
        <OpeningsPerKill />
        <TotalDamageDone />
        <DamagePerOpening />
        <InputsPerMinute />
      </div>
    </div>
  );
};
