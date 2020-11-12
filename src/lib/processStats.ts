import generateStats from "lib/stats";
import { GameDetails } from "store/types";

export function processStats(gameDetails: GameDetails[]): URLSearchParams {
  const { games, summary, btsSummary } = generateStats(gameDetails);
  const params: any = {}; // "mckm1": , "mckm2", "mcno1", "mcno2", "opk1", "opk2", "tdd1", "tdd2", "dpo1", "dpo2", "ipm1", "ipm2", "akp1", "akp2", "nw1", "nw2"};

  // Set character info
  const lastGame = games[games.length - 1];
  params.char1 = lastGame.players[0].characterId;
  params.char2 = lastGame.players[1].characterId;
  params.color1 = lastGame.players[0].characterColor;
  params.color2 = lastGame.players[1].characterColor;

  // Set game info
  params.gt = games.length; // Set the total number of games

  (games as any[]).forEach((game, i) => {
    console.log("processing game: ", game);
    const gameKey = `g${i + 1}`;
    const stageId: number = game.stage.id;
    const gameDuration: string = game.duration;
    const playerInfo = game.players.map((p: any) => [p.characterId, p.characterColor, p.gameResult].join(","));
    const gameValue = [stageId, gameDuration, ...playerInfo].join(",");
    console.log(`${gameKey} : ${gameValue}`);
    params[gameKey] = gameValue;
  });

  // Set the stat values
  (summary as any[]).forEach((s) => {
    switch (s.id) {
      case "openingsPerKill": {
        params.opk1 = s.results[0].simple.text;
        params.opk2 = s.results[1].simple.text;
        break;
      }
      case "damagePerOpening": {
        params.dpo1 = s.results[0].simple.text;
        params.dpo2 = s.results[1].simple.text;
        break;
      }
      case "neutralWins": {
        params.nw1 = s.results[0].simple.text;
        params.nw2 = s.results[1].simple.text;
        break;
      }
      case "killMoves": {
        console.log(s);
        const playerRes = s.results[0].result[0];
        const opponentRes = s.results[1].result[0];
        params.mckm1 = `${playerRes.shortName.toUpperCase()} - ${playerRes.count}`;
        params.mckm2 = `${opponentRes.shortName.toUpperCase()} - ${opponentRes.count}`;
        break;
      }
      case "neutralOpenerMoves": {
        const playerRes = s.results[0].result[0];
        const opponentRes = s.results[1].result[0];
        params.mcno1 = `${playerRes.shortName.toUpperCase()} - ${playerRes.count}`;
        params.mcno2 = `${opponentRes.shortName.toUpperCase()} - ${opponentRes.count}`;
        break;
      }
      case "inputsPerMinute": {
        params.ipm1 = s.results[0].simple.text;
        params.ipm2 = s.results[1].simple.text;
        break;
      }
      case "avgKillPercent": {
        params.akp1 = s.results[0].simple.text;
        params.akp2 = s.results[1].simple.text;
        break;
      }
      case "damageDone": {
        params.tdd1 = s.results[0].simple.text;
        params.tdd2 = s.results[1].simple.text;
        break;
      }
    }
  });

  console.log("returning these params: ", params);
  return new URLSearchParams(params);
}
