/*
 * Based on: https://github.com/project-slippi/slippi-set-stats/blob/master/main.js
 */

import { characters as characterUtil, stages as stageUtil } from "@slippi/slippi-js";
import { PlayerType } from "@slippi/slippi-js";
import _ from "lodash";

import { convertFrameCountToDurationString } from "../util";
import { findWinner } from "../winner";
import {
  averageKillPercent,
  damageDone,
  damagePerOpening,
  earlyKills,
  firstBlood,
  highDamagePunishes,
  inputsPerMinute,
  killMoves,
  lateDeaths,
  lCancelAccuracy,
  neutralOpenerMoves,
  neutralWins,
  openingsPerKill,
  selfDestructs,
} from "./definitions";
import { GameDetails, Stat, StatDefinition } from "./types";

export const STAT_DEFINITIONS = new Map<string, StatDefinition>();
STAT_DEFINITIONS.set(Stat.OPENINGS_PER_KILL, openingsPerKill);
STAT_DEFINITIONS.set(Stat.DAMAGE_PER_OPENING, damagePerOpening);
STAT_DEFINITIONS.set(Stat.NEUTRAL_WINS, neutralWins);
STAT_DEFINITIONS.set(Stat.KILL_MOVES, killMoves);
STAT_DEFINITIONS.set(Stat.NEUTRAL_OPENER_MOVES, neutralOpenerMoves);
STAT_DEFINITIONS.set(Stat.FIRST_BLOOD, firstBlood);
STAT_DEFINITIONS.set(Stat.L_CANCEL, lCancelAccuracy);
STAT_DEFINITIONS.set(Stat.EARLY_KILLS, earlyKills);
STAT_DEFINITIONS.set(Stat.LATE_DEATHS, lateDeaths);
STAT_DEFINITIONS.set(Stat.SELF_DESTRUCTS, selfDestructs);
STAT_DEFINITIONS.set(Stat.INPUTS_PER_MINUTE, inputsPerMinute);
STAT_DEFINITIONS.set(Stat.AVG_KILL_PERCENT, averageKillPercent);
STAT_DEFINITIONS.set(Stat.HIGH_DAMAGE_PUNISHES, highDamagePunishes);
STAT_DEFINITIONS.set(Stat.DAMAGE_DONE, damageDone);

function computeStats(statsList: string[], games: GameDetails[]) {
  const firstGame = _.first(games);
  if (!firstGame) {
    return [];
  }

  // console.log(firstGame);
  const orderIndices = _.map(firstGame.settings.players, "playerIndex");
  const reversedIndices = _.chain(orderIndices).clone().reverse().value();
  const indices = [orderIndices, reversedIndices];

  const statResults = statsList.map((statKey) => {
    const def = STAT_DEFINITIONS.get(statKey);
    if (!def || !def.calculate) {
      return null;
    }

    const { calculate, ...output } = def;
    const results = _.map(indices, (iIndices) => {
      const result: any = def.calculate(games, iIndices[0] /*, iIndices[1]*/);
      result.port = iIndices[0] + 1;
      return result;
    });

    return {
      ...output,
      id: statKey,
      results,
    };
  });

  return statResults;
}

function generateGameInfo(games: GameDetails[]) {
  const getStartAt = (game: GameDetails) => game.metadata.startAt;
  const orderedGames = _.orderBy(games, [getStartAt], ["asc"]);

  const getResultForPlayer = (game: GameDetails, playerIndex: number): "winner" | "loser" | "unknown" => {
    const gameEnd = game.gameEnd;
    if (gameEnd) {
      // Handle LRAS
      switch (gameEnd.gameEndMethod) {
        case 7:
          return gameEnd.lrasInitiatorIndex === playerIndex ? "loser" : "winner";
      }
    }

    const latestFrame = game.latestFrame;
    if (!latestFrame) {
      return "unknown";
    }
    const winner = findWinner(latestFrame);
    return winner === playerIndex ? "winner" : "loser";
  };

  const generatePlayerInfo = (game: GameDetails) => (player: PlayerType) => {
    // console.log(player);
    const characterName =
      player.characterId !== null ? characterUtil.getCharacterName(player.characterId) : `Player ${player.port}`;
    const characterColor =
      player.characterId !== null && player.characterColor !== null
        ? characterUtil.getCharacterColorName(player.characterId, player.characterColor)
        : "Default";

    return {
      port: player.port,
      characterId: player.characterId,
      nametag: player.nametag,
      characterName,
      characterColor,
      gameResult: getResultForPlayer(game, player.playerIndex),
    };
  };

  return _.map(orderedGames, (game: GameDetails) => {
    const playerInfoGen = generatePlayerInfo(game);

    return {
      stage: {
        id: game.settings.stageId,
        name: game.settings.stageId !== null ? stageUtil.getStageName(game.settings.stageId) : "",
      },
      players: _.map(game.settings.players, playerInfoGen),
      startTime: game.metadata.startAt,
      duration: convertFrameCountToDurationString(game.stats.lastFrame),
    };
  });
}

export function generateOutput(statsList: string[], games: GameDetails[]) {
  return {
    games: generateGameInfo(games),
    summary: computeStats(statsList, games),
  };
}
