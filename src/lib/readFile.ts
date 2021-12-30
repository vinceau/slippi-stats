import { SlippiGame } from "@slippi/slippi-js";

import { GameDetails } from "./stats/types";

export async function readFileAsGameDetails(file: File): Promise<GameDetails> {
  const game = await readFileAsSlippiGame(file);
  return generateGameDetails(file.name, game);
}

async function readFileAsSlippiGame(file: File): Promise<SlippiGame> {
  const data = (await readFileAsArrayBuffer(file)) as ArrayBuffer;
  const arr = new Int8Array(data);
  const buf = Buffer.from(arr);
  return new SlippiGame(buf);
}

function generateGameDetails(name: string, game: SlippiGame): GameDetails {
  // For a valid SLP game, at the very least we should have valid settings
  const settings = game.getSettings();
  if (!settings) {
    throw new Error(`Invalid SLP file. Could not find game settings in file: ${name}`);
  }

  const stats = game.getStats();
  if (!stats) {
    throw new Error(`Failed to process game stats for file: ${name}`);
  }

  const metadata = game.getMetadata();
  if (!metadata) {
    throw new Error(`Failed to load metadata for file: ${name}`);
  }

  return {
    filePath: name,
    settings,
    frames: game.getFrames(),
    stats,
    metadata,
    latestFrame: game.getLatestFrame(),
    gameEnd: game.getGameEnd(),
  };
}

async function readFileAsArrayBuffer(file: File): Promise<string | ArrayBufferLike> {
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
