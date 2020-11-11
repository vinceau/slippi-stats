import {
  FrameEntryType,
  FramesType,
  GameEndType,
  GameStartType,
  MetadataType,
  SlippiGame,
  StatsType,
} from "@slippi/slippi-js";

export interface GameDetails {
  filePath: string;
  settings: GameStartType;
  frames: FramesType;
  stats: StatsType;
  metadata: MetadataType;
  latestFrame: FrameEntryType | null;
  gameEnd: GameEndType | null;
}

export interface ProcessedFile {
  file: File;
  loading: boolean;
  error?: any;
  game: SlippiGame | null;
  details: GameDetails | null;
}

export interface InitialStateType {
  files: ProcessedFile[];
}
