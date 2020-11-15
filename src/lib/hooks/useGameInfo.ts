import { useEffect, useState } from "react";

import { useParam } from "./useParam";

export interface GameInfo {
  stageId: string;
  duration: string;
  char1: string;
  color1: string;
  result1: string;
  char2: string;
  color2: string;
  result2: string;
}

export function useGameInfo(index: number) {
  const [gameInfoString, setGameInfoString] = useParam(`g${index}`);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);

  useEffect(() => {
    // The game info starts off undefined
    if (!gameInfoString) {
      setGameInfo(null);
    } else {
      const [stageId, duration, char1, color1, result1, char2, color2, result2] = gameInfoString.split(",");
      setGameInfo({
        stageId,
        duration,
        char1,
        color1,
        result1,
        char2,
        color2,
        result2,
      });
    }
  }, [gameInfoString]);

  const setParam = (val: Partial<GameInfo>) => {
    const newValues = Object.assign({}, gameInfo, val);
    const { stageId, duration, char1, color1, result1, char2, color2, result2 } = newValues;
    const infoString = [stageId, duration, char1, color1, result1, char2, color2, result2].join(",");
    setGameInfoString(infoString);
  };

  return [gameInfo, setParam] as const;
}
