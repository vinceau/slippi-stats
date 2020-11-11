/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

import { InlineEdit } from "./InlineEdit";

// import CTE from "react-click-to-edit";
// import EditableLabel from "react-inline-editing";

export interface StatProps {
  label: string;
  labelColor?: string;
  labelBackground?: string;
  leftText: string;
  rightText: string;
  onLeftTextBlur?: (text: string) => void;
  onRightTextBlur?: (text: string) => void;
}

const StatLabel = styled.div<{
  labelBackground: string;
  labelColor: string;
}>`
  background-color: ${(p) => p.labelBackground};
  color: ${(p) => p.labelColor};
  padding: 1rem 5rem;
  font-weight: 700;
  font-size: 2rem;
  box-shadow: 0.5rem 0.5rem 0.5rem black;
  justify-self: center;
  z-index: 1;
`;

const StatContent = styled.div`
  font-weight: 800;
  font-size: 4rem;
`;

const OuterStat = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
  width: 100%;
  align-items: center;
  position: relative;

  &::before {
    z-index: -1;
    content: "";
    display: block;
    background-image: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
    height: 0.1rem;
    position: absolute;
    width: 80%;
    margin-left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Stat: React.FC<StatProps> = (props) => {
  const { label, leftText, rightText, labelBackground, labelColor } = props;
  return (
    <OuterStat>
      <StatContent
        css={css`
          justify-self: start;
        `}
      >
        <InlineEdit text={leftText} onSetText={props.onLeftTextBlur!} />
      </StatContent>
      <StatLabel labelBackground={labelBackground!} labelColor={labelColor!}>
        {label}
      </StatLabel>
      <StatContent
        css={css`
          justify-self: end;
        `}
      >
        <InlineEdit text={rightText} textAlign="right" onSetText={props.onRightTextBlur!} />
      </StatContent>
    </OuterStat>
  );
};

Stat.defaultProps = {
  labelColor: "black",
  labelBackground: "white",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onLeftTextBlur: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onRightTextBlur: () => {},
};
