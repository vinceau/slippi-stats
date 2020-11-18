import { FrameEntryType, FramesType, GameEndType, GameStartType, MetadataType, StatsType } from "@slippi/slippi-js";

export enum Stat {
  OPENINGS_PER_KILL = "openingsPerKill",
  DAMAGE_PER_OPENING = "damagePerOpening",
  NEUTRAL_WINS = "neutralWins",
  KILL_MOVES = "killMoves",
  NEUTRAL_OPENER_MOVES = "neutralOpenerMoves",
  EARLY_KILLS = "earlyKills",
  LATE_DEATHS = "lateDeaths",
  SELF_DESTRUCTS = "selfDestructs",
  INPUTS_PER_MINUTE = "inputsPerMinute",
  AVG_KILL_PERCENT = "avgKillPercent",
  HIGH_DAMAGE_PUNISHES = "highDamagePunishes",
  DAMAGE_DONE = "damageDone",
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
