/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

export interface StatDisplayProps {
  label: string;
  labelColor?: string;
  labelBackground?: string;
  leftText: string;
  rightText: string;
}

export const StatDisplay: React.FC<StatDisplayProps> = (props) => {
  const { label, leftText, rightText, labelBackground, labelColor } = props;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        &::before {
          z-index: -1;
          content: "";
          display: block;
          border-bottom: solid 0.2rem rgba(255, 255, 255, 0.05);
          height: 1px;
          position: absolute;
          width: 75%;
          margin-left: 50%;
          transform: translate(-50%, -50%);
        }
      `}
    >
      <div>{leftText}</div>
      <div
        css={css`
          background-color: ${labelBackground};
          color: ${labelColor};
          padding: 1rem 5rem;
          font-weight: 700;
          font-size: 2rem;
          box-shadow: 0.5rem 0.5rem 0.5rem black;
        `}
      >
        {label}
      </div>
      <div>{rightText}</div>
    </div>
  );
};

StatDisplay.defaultProps = {
  labelColor: "black",
  labelBackground: "white",
};
