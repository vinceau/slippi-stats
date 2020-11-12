/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParam } from "lib/hooks";
import { getCharacterVSScreen, Side } from "lib/resources";
import React from "react";

export interface CharDisplayProps {
  colorParam: string;
  charParam: string;
  align: Side;
  theme: string;
}

// Some characters have their faces to the right so it get cut off.
// e.g. Sheik and Bowser
// So make sure we return the desired alignment
const FLIP_RIGHT_CHARS = ["19", "5"];

function getAlignment(facing: Side, char: string, defaultAlignment: Side): Side {
  if (facing === "left") {
    return defaultAlignment;
  }

  // We so far only care about the right hand side of the VS-screen
  if (FLIP_RIGHT_CHARS.includes(char)) {
    return "right";
  }

  return defaultAlignment;
}

export const CharDisplay: React.FC<CharDisplayProps> = (props) => {
  const { colorParam, charParam, align, theme } = props;
  const [color] = useParam(colorParam);
  const [char] = useParam(charParam);
  const facing: Side = align === "left" ? "right" : "left";
  const imgSrc = getCharacterVSScreen(facing, char, color);
  const alignment = getAlignment(facing, char, align);
  return (
    <div
      css={css`
        height: 80%;
        width: 100%;
        position: relative;
        background: radial-gradient(circle at center -30%, ${theme}, transparent);
        &::after {
          content: ' ';
          position: absolute;
          height: 100%;
          width: 100%;
          background-image: url("${imgSrc}");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: top ${alignment};
        }
      `}
    ></div>
  );
};
