import {
  FrameEntryType,
  FramesType,
  GameEndType,
  GameStartType,
  MetadataType,
  SlippiGame,
  StatsType,
} from "@slippi/slippi-js";

import generateStats from "./stats";

export interface GameDetails {
  filePath: string;
  settings: GameStartType;
  frames: FramesType;
  stats: StatsType;
  metadata: MetadataType;
  latestFrame: FrameEntryType | null;
  gameEnd: GameEndType | null;
}

export async function generateStatsOutput(files: File[]) {
  const games = await readFilesAsSlippiGameDetails(files);
  console.log(games);
  const output = generateStats(games);
  console.log(output);
  return output;
}

export async function readFileAsSlippiGame(file: File): Promise<SlippiGame> {
  const data = (await readFileAsArrayBuffer(file)) as ArrayBuffer;
  const arr = new Int8Array(data);
  const buf = Buffer.from(arr);
  return new SlippiGame(buf);
}

export async function readFileAsGameDetails(file: File): Promise<GameDetails> {
  const game = await readFileAsSlippiGame(file);
  return generateGameDetails(file.name, game);
}

export function generateGameDetails(name: string, game: SlippiGame): GameDetails {
  // For a valid SLP game, at the very least we should have valid settings
  const settings = game.getSettings();
  if (!settings) {
    throw new Error(`Invalid SLP file. Could not find game settings in file: ${name}`);
  }

  return {
    filePath: name,
    settings,
    frames: game.getFrames(),
    stats: game.getStats(),
    metadata: game.getMetadata(),
    latestFrame: game.getLatestFrame(),
    gameEnd: game.getGameEnd(),
  };
}

export async function readFilesAsSlippiGameDetails(files: File[]): Promise<GameDetails[]> {
  const promises = files.map(async (f) => {
    console.log("checking file: ", f);
    const data = (await readFileAsArrayBuffer(f)) as ArrayBuffer;
    const arr = new Int8Array(data);
    const buf = Buffer.from(arr);
    const game = new SlippiGame(buf);
    // console.log(game.getStats());
    return {
      filePath: f.name,
      settings: game.getSettings(),
      frames: game.getFrames(),
      stats: game.getStats(),
      metadata: game.getMetadata(),
      latestFrame: game.getLatestFrame(),
      gameEnd: game.getGameEnd(),
    };
  });
  return Promise.all(promises);
}

export async function readFileAsArrayBuffer(file: File): Promise<string | ArrayBufferLike> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onabort = () => reject("file reading was aborted");
    fr.onerror = () => reject("file reading has failed");
    if (fr.readAsBinaryString) {
      fr.addEventListener(
        "load",
        function () {
          const string = (this as any).resultString != null ? (this as any).resultString : this.result;
          const result = new Uint8Array(string.length);
          for (let i = 0; i < string.length; i++) {
            result[i] = string.charCodeAt(i);
          }
          resolve(result.buffer);
        },
        false
      );
      fr.readAsBinaryString(file);
    } else {
      fr.addEventListener(
        "load",
        function () {
          if (this.result) {
            resolve(this.result);
          } else {
            reject("no data read");
          }
        },
        false
      );
      fr.readAsArrayBuffer(file);
    }
  });
}
