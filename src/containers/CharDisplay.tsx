/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParam } from "lib/hooks";
import { getCharacterVSScreen, Side } from "lib/resources";
import React from "react";
import { Character } from "@slippi/slippi-js";

export interface CharDisplayProps {
  colorParam: string;
  charParam: string;
  align: Side;
  theme: string;
}

// Some characters have their faces to the right so it get cut off
// so adjust the alignment so you can properly see their faces.
const RIGHT_CHAR_ALIGNMENT = new Map<Character, string>();
RIGHT_CHAR_ALIGNMENT.set(Character.BOWSER, "right top");
RIGHT_CHAR_ALIGNMENT.set(Character.SHEIK, "right top");
RIGHT_CHAR_ALIGNMENT.set(Character.ROY, "left 80%");

function getAlignment(facing: Side, char: string, defaultAlignment: string): string {
  if (facing === "left") {
    return defaultAlignment;
  }

  // We so far only care about the right hand side of the VS-screen
  const customCharAlign = RIGHT_CHAR_ALIGNMENT.get(+char);
  if (customCharAlign) {
    return customCharAlign;
  }

  return defaultAlignment;
}

export const CharDisplay: React.FC<CharDisplayProps> = (props) => {
  const { colorParam, charParam, align, theme } = props;
  const [color] = useParam(colorParam);
  const [char] = useParam(charParam);
  const facing: Side = align === "left" ? "right" : "left";
  const imgSrc = getCharacterVSScreen(facing, char, color);
  const alignment = getAlignment(facing, char, `${align} top`);
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
          background-position: ${alignment};
        }
      `}
    ></div>
  );
};
