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
          display: flex;
          flex-direction: column;
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
