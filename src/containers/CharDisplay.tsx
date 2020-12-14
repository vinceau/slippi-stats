/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Character } from "@slippi/slippi-js";
import { useParam } from "lib/hooks";
import { getCharacterVSScreen, Side } from "lib/resources";
import React from "react";

export interface CharDisplayProps {
  colorParam: string;
  charParam: string;
  align: Side;
  theme: string;
}

// Some characters have their faces to the right so it gets cut off.
// Adjust the alignment so you can properly see their faces.
const RIGHT_CHAR_ALIGNMENT = new Map<Character, string>();
RIGHT_CHAR_ALIGNMENT.set(Character.BOWSER, "right top");
RIGHT_CHAR_ALIGNMENT.set(Character.SHEIK, "right top");
RIGHT_CHAR_ALIGNMENT.set(Character.ROY, "left 80%");

function getAlignment(facing: Side, char: string, defaultAlignment: string): string {
  // We only care custom alignments for the right hand side of the VS-screen
  if (facing === "right") {
    const customCharAlign = RIGHT_CHAR_ALIGNMENT.get(+char);
    if (customCharAlign) {
      return customCharAlign;
    }
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
