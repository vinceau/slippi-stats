/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

export interface StatProps {
  label: string;
  labelColor?: string;
  labelBackground?: string;
  leftText: string;
  rightText: string;
}

const StatContent = styled.div`
  font-weight: 800;
  font-size: 4rem;
`;

const OuterStat = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;

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
`;

export const Stat: React.FC<StatProps> = (props) => {
  const { label, leftText, rightText, labelBackground, labelColor } = props;
  return (
    <OuterStat>
      <StatContent>{leftText}</StatContent>
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
      <StatContent>{rightText}</StatContent>
    </OuterStat>
  );
};

Stat.defaultProps = {
  labelColor: "black",
  labelBackground: "white",
};
