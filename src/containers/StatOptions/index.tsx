/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import { StatOptionList } from "./StatOptionList";
import { StatOption } from "./types";

export * from "./types";

const Button = styled.button`
  background: white;
  border: none;
  color: black;
  cursor: pointer;
  font: inherit;
  padding: 1rem 0rem;
  width: 100%;
  font-weight: 700;
  font-size: 3rem;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:enabled {
    opacity: 1;
  }
`;

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
      <Button onClick={props.onClose}>DONE</Button>
    </div>
  );
};
