/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import { Block } from "./Block";

export interface StatProps {
  label: string;
  color: string;
  backgroundColor: string;
  leftComponent: React.ReactNode;
  rightComponent: React.ReactNode;
}

const StatLabel = styled(Block)`
  padding: 0.3em 2.5em;
  font-weight: 700;
  font-size: 1.2em;
  justify-self: center;
`;

const StatContent = styled.div`
  width: 100%;
  font-weight: 800;
  font-size: 2.3em;
`;

const TextContent = styled(StatContent)`
  font-size: 1.4em;
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

const Stat: React.FC<StatProps> = (props) => {
  const { label, backgroundColor, color, leftComponent, rightComponent } = props;
  return (
    <OuterStat>
      <div
        css={css`
          width: 100%;
          justify-self: start;
        `}
      >
        {leftComponent}
      </div>
      <StatLabel backgroundColor={backgroundColor} color={color}>
        {label}
      </StatLabel>
      <div
        css={css`
          width: 100%;
          justify-self: end;
          text-align: right;
        `}
      >
        {rightComponent}
      </div>
    </OuterStat>
  );
};

Stat.defaultProps = {
  color: "black",
  backgroundColor: "white",
};

export const NumberStat: React.FC<StatProps> = (props) => {
  const { leftComponent, rightComponent, ...rest } = props;
  return (
    <Stat
      leftComponent={<StatContent>{leftComponent}</StatContent>}
      rightComponent={<StatContent>{rightComponent}</StatContent>}
      {...rest}
    />
  );
};

export const TextStat: React.FC<StatProps> = (props) => {
  const { leftComponent, rightComponent, ...rest } = props;
  return (
    <Stat
      leftComponent={<TextContent>{leftComponent}</TextContent>}
      rightComponent={<TextContent>{rightComponent}</TextContent>}
      {...rest}
    />
  );
};
