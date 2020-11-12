import React from "react";
import { HeadToHead } from "./HeadToHead";

export interface GameResultProps {
  stageId: string;
  duration: string;
  char1: number | string;
  color1: string;
  result1: string;
  char2: number | string;
  color2: string;
  result2: string;
}

export const GameResult: React.FC<GameResultProps> = (props) => {
  return (
    <div>
      <HeadToHead {...props} />
    </div>
  );
};
