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
  const imgSrc = `${process.env.PUBLIC_URL}/images/characters/${char}/${color}/portrait.png`;
  return (
    <div>
      <img src={imgSrc} />
    </div>
  );
};
