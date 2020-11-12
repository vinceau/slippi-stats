import { GameDetails } from "lib/readFile";

export interface ProcessedFile {
  filename: string;
  loading: boolean;
  error?: any;
  details: GameDetails | null;
}

export interface InitialStateType {
  files: ProcessedFile[];
}
