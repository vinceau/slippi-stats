import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

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

export function useGames() {
  const [games, setGames] = useState<Array<GameInfo | null>>([]);
  const [score, setScore] = useState<{ left: number; right: number }>({ left: 0, right: 0 });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const gt = params.get("gt") || "0";
    const totalGames = parseInt(gt, 10) || 0;

    let char1Score = 0;
    let char2Score = 0;

    const gameInfos: Array<GameInfo | null> = [];

    for (let i = 1; i <= totalGames; i++) {
      const gameInfoString = params.get(`g${i}`);

      if (!gameInfoString) {
        // Game is undefined
        gameInfos.push(null);
        continue;
      }

      // Generate the game info
      const [stageId, duration, char1, color1, result1, char2, color2, result2] = gameInfoString.split(",");
      gameInfos.push({
        stageId,
        duration,
        char1,
        color1,
        result1,
        char2,
        color2,
        result2,
      });

      // Update the scores
      if (result1 === "winner") {
        char1Score += 1;
      }

      if (result2 === "winner") {
        char2Score += 1;
      }
    }

    setGames(gameInfos);
    setScore({ left: char1Score, right: char2Score });
  }, [location]);

  const setParam = (gameNumber: number, val: Partial<GameInfo>) => {
    const currentGameData = games[gameNumber - 1];
    const newValues = Object.assign({}, currentGameData, val);
    const { stageId, duration, char1, color1, result1, char2, color2, result2 } = newValues;
    const infoString = [stageId, duration, char1, color1, result1, char2, color2, result2].join(",");

    const params = new URLSearchParams(location.search);
    params.set(`g${gameNumber}`, infoString);
    const search = "?" + params.toString();
    history.push({
      pathname: location.pathname,
      search,
    });
  };

  return {
    games,
    score,
    setGame: setParam,
  };
}
