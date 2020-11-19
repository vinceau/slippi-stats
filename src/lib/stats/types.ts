import { FrameEntryType, FramesType, GameEndType, GameStartType, MetadataType, StatsType } from "@slippi/slippi-js";

export enum Stat {
  OPENINGS_PER_KILL = "opk",
  DAMAGE_PER_OPENING = "dpo",
  NEUTRAL_WINS = "nw",
  KILL_MOVES = "mckm",
  NEUTRAL_OPENER_MOVES = "mcno",
  INPUTS_PER_MINUTE = "ipm",
  AVG_KILL_PERCENT = "akp",
  DAMAGE_DONE = "tdd",

  // Custom
  FIRST_BLOOD = "fb",

  // Currently unsupported
  EARLY_KILLS = "earlyKills",
  LATE_DEATHS = "lateDeaths",
  SELF_DESTRUCTS = "selfDestructs",
  HIGH_DAMAGE_PUNISHES = "highDamagePunishes",
}

export interface GameDetails {
  filePath: string;
  settings: GameStartType;
  frames: FramesType;
  stats: StatsType;
  metadata: MetadataType;
  latestFrame: FrameEntryType | null;
  gameEnd: GameEndType | null;
}

export interface StatCalculationResult {
  result: any;
  simple: any;
}

export type StatCalculation = (games: GameDetails[], playerIndex: number) => StatCalculationResult;
