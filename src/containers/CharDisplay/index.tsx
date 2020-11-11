/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParam } from "lib/hooks";
import React from "react";

export interface CharDisplayProps {
  colorParam: string;
  charParam: string;
}

export const CharDisplay: React.FC<CharDisplayProps> = (props) => {
  const { colorParam, charParam } = props;
  const [color] = useParam(colorParam);
  const [char] = useParam(charParam);
  const imgSrc = `${process.env.PUBLIC_URL}/images/characters/${char}/${color}/vs-left.png`;
  return (
    <div
      css={css`
        display: block;
        height: 100%;
        width: 100%;
        background-image: url(${imgSrc});
        background-repeat: no-repeat;
        background-position: center center;
      `}
    ></div>
  );
};
