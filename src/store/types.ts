import { FrameEntryType, FramesType, GameEndType, GameStartType, MetadataType, StatsType } from "@slippi/slippi-js";

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
  filename: string;
  loading: boolean;
  error?: any;
  details: GameDetails | null;
}

export interface InitialStateType {
  files: ProcessedFile[];
}
