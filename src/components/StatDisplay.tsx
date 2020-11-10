/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { Stat } from "./Stat";

export interface StatInput {
  left: string;
  right: string;
}

export interface StatDisplayProps {
  mostCommonKillMove: StatInput;
  mostCommonNeutralOpener: StatInput;
  openingsPerKill: StatInput;
  totalDamageDone: StatInput;
  damagePerOpening: StatInput;
  inputsPerMinute: StatInput;
}

export const StatDisplay: React.FC<StatDisplayProps> = (props) => {
  const {
    mostCommonKillMove,
    mostCommonNeutralOpener,
    openingsPerKill,
    totalDamageDone,
    damagePerOpening,
    inputsPerMinute,
  } = props;
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
        <Stat leftText={mostCommonKillMove.left} label="MOST COMMON KILL MOVE" rightText={mostCommonKillMove.right} />
        <Stat
          leftText={mostCommonNeutralOpener.left}
          label="MOST COMMON NEUTRAL OPENER"
          rightText={mostCommonNeutralOpener.right}
        />
        <Stat leftText={openingsPerKill.left} label="OPENINGS / KILL" rightText={openingsPerKill.right} />
        <Stat leftText={totalDamageDone.left} label="TOTAL DAMAGE DONE" rightText={totalDamageDone.right} />
        <Stat leftText={damagePerOpening.left} label="DAMAGE / OPENING" rightText={damagePerOpening.right} />
        <Stat leftText={inputsPerMinute.left} label="INPUTS / MINUTE" rightText={inputsPerMinute.right} />
      </div>
    </div>
  );
};

StatDisplay.defaultProps = {};
