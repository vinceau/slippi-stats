import { characters as characterUtil, moves as moveUtil, Stage } from "@slippi/slippi-js";
import { sampleSize } from "lodash";

import { Stat, STAT_DEFINITIONS } from "./stats";
import { convertFrameCountToDurationString } from "./util";

const LEGAL_STAGE_IDS = [
  Stage.FOUNTAIN_OF_DREAMS,
  Stage.POKEMON_STADIUM,
  Stage.YOSHIS_STORY,
  Stage.DREAMLAND,
  Stage.BATTLEFIELD,
  Stage.FINAL_DESTINATION,
];

/*
 * Random functions are taken from: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDemoValues(): Record<string, any> {
  const paramMap: Record<string, any> = {};

  // Set names
  paramMap.name1 = "FOLLOW";
  paramMap.name2 = "ON";
  paramMap.sub1 = "@_vinceau";
  paramMap.sub2 = "TWITTER";

  // Set colors
  const [char1, color1] = generateRandomCharacter();
  const [char2, color2] = generateRandomCharacter();
  paramMap.char1 = char1;
  paramMap.color1 = color1;
  paramMap.char2 = char2;
  paramMap.color2 = color2;

  // Random games
  const totalGames = getRandomInt(3, 5);
  paramMap.gt = totalGames;
  sampleSize(LEGAL_STAGE_IDS, totalGames).forEach((stage, i) => {
    const gameKey = `g${i + 1}`;
    const leftWillWin = Math.random() < 0.5;
    const leftPlayerInfo = [char1, color1, leftWillWin ? "winner" : "loser"].join(",");
    const rightPlayerInfo = [char2, color2, leftWillWin ? "loser" : "winner"].join(",");
    const gameValue = generateRandomGame([leftPlayerInfo, rightPlayerInfo], stage);
    paramMap[gameKey] = gameValue;
  });

  const demoStats = [
    Stat.KILL_MOVES,
    Stat.NEUTRAL_OPENER_MOVES,
    "",
    Stat.OPENINGS_PER_KILL,
    Stat.DAMAGE_DONE,
    Stat.AVG_KILL_PERCENT,
    Stat.NEUTRAL_WINS,
  ];

  paramMap.stats = demoStats.join(",");

  demoStats
    .filter((s) => Boolean(s))
    .forEach((statId) => {
      [1, 2].forEach((player) => {
        const key = statId + player;
        paramMap[key] = generateRandomStat(statId);
      });
    });
  return paramMap;
}

function generateRandomStat(statId: string): string {
  const stat = STAT_DEFINITIONS.get(statId);
  if (!stat) {
    return "";
  }
  switch (statId) {
    case Stat.NEUTRAL_OPENER_MOVES:
      return generateRandomMove();
    case Stat.KILL_MOVES:
      return generateRandomMove();
    case Stat.OPENINGS_PER_KILL:
      return getRandomArbitrary(5, 15).toFixed(stat.recommendedRounding);
    case Stat.DAMAGE_DONE:
      return getRandomArbitrary(1000, 2000).toFixed(stat.recommendedRounding);
    case Stat.AVG_KILL_PERCENT:
      return getRandomArbitrary(50, 200).toFixed(stat.recommendedRounding);
    case Stat.NEUTRAL_WINS:
      return getRandomInt(30, 80).toString();
    default:
      return "";
  }
}

function generateRandomMove(): string {
  const move = getRandomInt(7, 21);
  const name = moveUtil.getMoveShortName(move).toUpperCase();
  return `${name} - ${move}`;
}

function generateRandomCharacter() {
  const charId = getRandomInt(0, 25);
  const charInfo = characterUtil.getCharacterInfo(charId);
  const colorIndex = getRandomInt(0, charInfo.colors.length - 1);
  const color = charInfo.colors[colorIndex];
  return [charId, color] as const;
}

function generateRandomStageId(): number {
  const stageIndex = getRandomInt(0, LEGAL_STAGE_IDS.length - 1);
  return LEGAL_STAGE_IDS[stageIndex];
}

function generateRandomDuration(): string {
  // The number of frames in 30 seconds
  const minFrames = 30 * 60;
  // The number of frames in 8 minutes
  const maxFrames = 8 * 60 * 60;
  const frames = getRandomInt(minFrames, maxFrames);
  return convertFrameCountToDurationString(frames);
}

function generateRandomGame(playerInfos: string[], stage?: Stage): string {
  const stageId = stage !== undefined ? stage : generateRandomStageId();
  const gameDuration = generateRandomDuration();
  const gameValue = [stageId, gameDuration, ...playerInfos].join(",");
  return gameValue;
}
