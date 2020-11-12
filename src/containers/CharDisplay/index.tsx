/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParam } from "lib/hooks";
import { Side, getCharacterVSScreen } from "lib/resources";
import React from "react";

export interface CharDisplayProps {
  colorParam: string;
  charParam: string;
  align: Side;
  theme: string;
}

export const CharDisplay: React.FC<CharDisplayProps> = (props) => {
  const { colorParam, charParam, align, theme } = props;
  const [color] = useParam(colorParam);
  const [char] = useParam(charParam);
  const facing: Side = align === "left" ? "right" : "left";
  const imgSrc = getCharacterVSScreen(facing, char, color);
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
          background-position: top ${align};
        }
      `}
    ></div>
  );
};
