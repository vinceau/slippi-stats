import styled from "@emotion/styled";
import { getCharacterPortrait } from "lib/resources";
import React from "react";

const Outer = styled.div<{
  borderColor: string;
  onClick?: () => void;
}>`
  position: relative;
  display: block;
  border: solid 0.1rem ${(p) => p.borderColor};
  height: 5rem;
  width: 100%;
  max-width: 10rem;
  ${(p) => (p.onClick ? "cursor: pointer;" : "")}
`;

const BaseHeadImage = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  &::after {
    content: " ";
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
  }
`;

const HeadImage = styled(BaseHeadImage)<{
  backgroundColor?: string;
  imageSrc: string;
  side: "left" | "right";
  waypoint: number;
  dim?: boolean;
}>`
  ${(p) => {
    const invWaypoint = 100 - p.waypoint;
    return `
      ${p.side === "right" ? `clip-path: polygon(${p.waypoint}% 0, 100% 0, 100% 100%, ${invWaypoint}% 100%);` : ""}
      ${p.dim ? "filter: brightness(25%);" : ""}
      ${p.backgroundColor ? `background: radial-gradient(circle at center -30%, ${p.backgroundColor}, black);` : ""}
      &::after {
        width: ${p.waypoint}%;
        background-image: url("${p.imageSrc}");
        background-position: top ${p.side};
        ${p.side === "right" ? `left: ${invWaypoint}%;` : "transform: scaleX(-1);"}
      }
    `;
  }}
`;

export interface HeadToHeadProps {
  char1: number | string;
  color1: string;
  result1: string;
  char2: number | string;
  color2: string;
  result2: string;
  leftColor: string;
  rightColor: string;
  borderColor?: string;
  onClick?: () => void;
}

export const HeadToHead: React.FC<HeadToHeadProps> = ({
  char1,
  color1,
  result1,
  char2,
  color2,
  result2,
  leftColor,
  rightColor,
  borderColor,
  onClick,
}) => {
  const waypoint = 55;
  const p1 = getCharacterPortrait(char1, color1);
  const p2 = getCharacterPortrait(char2, color2);

  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Outer borderColor={borderColor || "transparent"} onClick={clickHandler}>
      <HeadImage backgroundColor={leftColor} imageSrc={p1} waypoint={waypoint} side="left" dim={result1 === "loser"} />
      <HeadImage
        backgroundColor={rightColor}
        imageSrc={p2}
        waypoint={waypoint}
        side="right"
        dim={result2 === "loser"}
      />
    </Outer>
  );
};
