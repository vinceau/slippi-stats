/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import styled from "@emotion/styled";
import { getCharacterFolderFromId } from "lib/resources";

const Outer = styled.div`
  position: relative;
  display: block;
  border: solid 0.1rem rgba(255, 255, 255, 0.3);
  height: 40px;
  width: 90px;
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

type Side = "left" | "right";

const flip = (side: Side): Side => (side === "left" ? "right" : "left");

const HeadImage = styled(BaseHeadImage)<{
  backgroundColor?: string;
  imageSrc: string;
  imageAlignment: Side;
  side: Side;
  waypoint: number;
  dim?: boolean;
}>`
  ${(p) => {
    const position = p.imageAlignment === p.side ? p.side : flip(p.side);
    const invWaypoint = 100 - p.waypoint;
    return `
      ${p.side === "right" ? `clip-path: polygon(${p.waypoint}% 0, 100% 0, 100% 100%, ${invWaypoint}% 100%);` : ""}
      ${p.dim ? "filter: brightness(30%);" : ""}
      ${p.backgroundColor ? `background-color: ${p.backgroundColor};` : ""}
      &::after {
        width: ${p.waypoint}%;
        background-image: url(${p.imageSrc});
        background-position: top ${position};
        ${p.side === "right" ? `left: ${invWaypoint}%;` : ""}
        ${p.side !== p.imageAlignment ? "transform: scaleX(-1);" : ""}
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
}

export const HeadToHead: React.FC<HeadToHeadProps> = ({ char1, color1, result1, char2, color2, result2 }) => {
  const waypoint = 55;
  const p1 = `${getCharacterFolderFromId(char1, color1)}/portrait.png`;
  const p2 = `${getCharacterFolderFromId(char2, color2)}/portrait.png`;

  return (
    <Outer>
      <HeadImage
        backgroundColor="red"
        imageSrc={p1}
        waypoint={waypoint}
        imageAlignment={"right"}
        side="left"
        dim={result1 === "loser"}
      />
      <HeadImage
        backgroundColor="green"
        imageSrc={p2}
        waypoint={waypoint}
        imageAlignment={"right"}
        side="right"
        dim={result2 === "loser"}
      />
    </Outer>
  );
};
