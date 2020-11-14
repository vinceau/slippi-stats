import styled from "@emotion/styled";
import { getStageIcon } from "lib/resources";
import React from "react";

interface StageTimerProps {
  stageId: string | number;
  duration: string;
  highlight?: boolean;
}

const Text = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  opacity: 0.7;
  text-shadow: 2px 2px 2px black;
`;

const Outer = styled.div<{
  src: string;
  highlight?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 9rem;
  width: 100%;
  border: solid 1px rgba(255, 255, 255, ${(p) => (p.highlight ? "0.8" : "0.2")});
  z-index: 0;

  &::after {
    content: ' ';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("${(p) => p.src}");
    background-repeat: no-repeat;
    background-size: 105% auto;
    background-position: center;
    filter: blur(2px) brightness(30%);
    z-index: -1;
  }
`;

export const StageTimer: React.FC<StageTimerProps> = ({ stageId, duration, highlight }) => {
  const stageIcon = getStageIcon(stageId);
  return (
    <Outer src={stageIcon} highlight={highlight}>
      <Text>{duration}</Text>
    </Outer>
  );
};
