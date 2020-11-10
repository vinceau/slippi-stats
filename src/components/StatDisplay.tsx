/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { Stat } from "./Stat";

export interface StatDisplayProps {}

export const StatDisplay: React.FC<StatDisplayProps> = (props) => {
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
        <Stat leftText="9.5" label="OPENINGS / KILL" rightText="9.7" />
        <Stat leftText="1990.2" label="TOTAL DAMAGE DONE" rightText="1412.6" />
        <Stat leftText="15.0" label="DAMAGE / OPENING" rightText="12.2" />
        <Stat leftText="636.6" label="INPUTS / MINUTE" rightText="481.5" />
      </div>
    </div>
  );
};

StatDisplay.defaultProps = {};
