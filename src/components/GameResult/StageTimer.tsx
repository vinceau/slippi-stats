/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { getStageIcon } from "lib/resources";
import React from "react";

interface StageTimerProps {
  stageId: string | number;
  duration: string;
}

const Text = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  opacity: 0.7;
  text-shadow: 2px 2px 2px black;
`;

const Outer = styled.div<{
  src: string;
}>`
border: solid 1px rgba(255, 255, 255, 0.3);
z-index: 1;
position: relative;
    width: 100%;
    height: 9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      z-index: -1;
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
  background-image: url("${(p) => p.src}");
  background-repeat: no-repeat;
  background-size: 105% auto;
  background-position: center;
  filter: blur(1px) brightness(30%);
    }
`;

export const StageTimer: React.FC<StageTimerProps> = ({ stageId, duration }) => {
  const stageIcon = getStageIcon(stageId);
  return (
    <Outer src={stageIcon}>
      <Text>{duration}</Text>
    </Outer>
  );
};
