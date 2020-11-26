/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PrimaryButton, SecondaryButton } from "components/Buttons";
import React from "react";
import { StatOptionList } from "./StatOptionList";
import { StatOption } from "./types";

export * from "./types";

interface StatOptionsProps {
  onClose: () => void;
  value: StatOption[];
  onChange: (stats: StatOption[]) => void;
  onReset: () => void;
  hideReset?: boolean;
}

export const StatOptions: React.FC<StatOptionsProps> = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        height: 100%;
        width: 100%;
      `}
    >
      <h2
        css={css`
          text-align: center;
        `}
      >
        CUSTOMIZE STATS
      </h2>
      <div
        css={css`
          overflow: auto;
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
        `}
      >
        <StatOptionList value={props.value} onChange={props.onChange} />
      </div>
      <PrimaryButton backgroundColor="white" color="black" onClick={props.onClose}>
        DONE
      </PrimaryButton>
      {!props.hideReset && <SecondaryButton onClick={props.onReset}>reset</SecondaryButton>}
    </div>
  );
};
