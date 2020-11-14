import generateStats, { filterGames } from "lib/stats";
import { get } from "lodash";

import { getPortColor } from "./portColor";
import { GameDetails } from "./readFile";

const extractNameAndCode = (playerPort: number, details: GameDetails) => {
  const settings = details.settings;
  const metadata = details.metadata;
  const index = playerPort - 1;
  const player = settings.players.find((player) => player.playerIndex === index);
  const playerTag = player ? player.nametag : null;
  const netplayName: string | null = get(metadata, ["players", index, "names", "netplay"], null);
  const netplayCode: string | null = get(metadata, ["players", index, "names", "code"], null);
  const name = playerTag || netplayName || "";
  return [name, netplayCode || ""] as const;
};

export function processStats(gameDetails: GameDetails[]): Record<string, any> {
  const filtered = filterGames(gameDetails);
  if (!filtered || filtered.length === 0) {
    throw new Error("No valid games");
  }

  const { games, summary } = generateStats(filtered);
  const params: Record<string, any> = {}; // "mckm1": , "mckm2", "mcno1", "mcno2", "opk1", "opk2", "tdd1", "tdd2", "dpo1", "dpo2", "ipm1", "ipm2", "akp1", "akp2", "nw1", "nw2"};

  // Set character info
  const lastGame = games[games.length - 1];
  const leftPlayer = lastGame.players[0];
  const rightPlayer = lastGame.players[1];
  params.leftColor = getPortColor(leftPlayer.port);
  params.rightColor = getPortColor(rightPlayer.port);

  params.char1 = leftPlayer.characterId;
  params.char2 = rightPlayer.characterId;
  params.color1 = leftPlayer.characterColor;
  params.color2 = rightPlayer.characterColor;

  // Set name tags
  const lastGameDetails = filtered[filtered.length - 1];
  const [leftTag, leftCode] = extractNameAndCode(leftPlayer.port, lastGameDetails);
  const [rightTag, rightCode] = extractNameAndCode(rightPlayer.port, lastGameDetails);
  params.name1 = leftTag.toUpperCase() || leftPlayer.characterName;
  params.name2 = rightTag.toUpperCase() || rightPlayer.characterName;
  params.sub1 = leftCode;
  params.sub2 = rightCode;

  // Set game info
  params.gt = games.length; // Set the total number of games

  // Track game wins
  let leftWins = 0;
  let rightWins = 0;

  (games as any[]).forEach((game, i) => {
    // console.log("processing game: ", game);
    const gameKey = `g${i + 1}`;
    const stageId: number = game.stage.id;
    const gameDuration: string = game.duration;
    const playerInfo = game.players.map((p: any) => [p.characterId, p.characterColor, p.gameResult].join(","));
    const gameValue = [stageId, gameDuration, ...playerInfo].join(",");
    // console.log(`${gameKey} : ${gameValue}`);
    params[gameKey] = gameValue;

    // Increment win counts
    if (game.players[0].gameResult === "winner") {
      leftWins += 1;
    } else if (game.players[1].gameResult === "winner") {
      rightWins += 1;
    }
  });

  params.score = `${leftWins} - ${rightWins}`;
  if (leftWins !== rightWins) {
    params.winner = leftWins > rightWins ? "left" : "right";
  }

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
        // console.log(s);
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
  return params;
}
