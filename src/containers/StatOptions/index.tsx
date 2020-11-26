/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { MainButton } from "components/MainButton";
import React from "react";
import { StatOptionList } from "./StatOptionList";
import { StatOption } from "./types";

export * from "./types";

interface StatOptionsProps {
  onClose: () => void;
  value: StatOption[];
  onChange: (stats: StatOption[]) => void;
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
      <MainButton backgroundColor="white" color="black" onClick={props.onClose}>
        DONE
      </MainButton>
    </div>
  );
};
