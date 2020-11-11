/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

import { InlineEdit } from "./InlineEdit";

export interface StatProps {
  type?: "text" | "number";
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
  text-align: center;
  background-color: ${(p) => p.labelBackground};
  color: ${(p) => p.labelColor};
  padding: 0.3em 2.5em;
  font-weight: 700;
  font-size: 1.2em;
  box-shadow: 0.2em 0.2em 0.2em black;
  justify-self: center;
  z-index: 1;
`;

const StatContent = styled.div<{
  type: "text" | "number";
}>`
  font-weight: 800;
  font-size: ${(p) => (p.type === "text" ? "1.4em" : "2.3em")};
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
  const { type, label, leftText, rightText, labelBackground, labelColor } = props;
  return (
    <OuterStat>
      <StatContent
        type={type!}
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
        type={type!}
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
  type: "number",
  labelColor: "black",
  labelBackground: "white",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onLeftTextBlur: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onRightTextBlur: () => {},
};
