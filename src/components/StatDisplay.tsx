/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { useQuery } from "../lib/hooks";
import { useParam } from "../lib/hooks/useParam";
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

  const [mckm1, setMckm1] = useParam("mckm1", "0");
  const [mckm2, setMckm2] = useParam("mckm2", "0");
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
        <Stat
          leftText={mckm1}
          onLeftTextBlur={(text) => setMckm1(text)}
          label="MOST COMMON KILL MOVE"
          rightText={mckm2}
          onRightTextBlur={(text) => setMckm2(text)}
        />
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
