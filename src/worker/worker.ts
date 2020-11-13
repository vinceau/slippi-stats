/* ./worker/worker.ts */

import {
  FrameEntryType,
  FramesType,
  GameEndType,
  GameStartType,
  MetadataType,
  SlippiGame,
  StatsType,
} from "@slippi/slippi-js";

export function generateGameDetails(name: string, game: SlippiGame): GameDetails {
  return {
    filePath: name,
    settings: game.getSettings(),
    frames: game.getFrames(),
    stats: game.getStats(),
    metadata: game.getMetadata(),
    latestFrame: game.getLatestFrame(),
    gameEnd: game.getGameEnd(),
  };
}

interface GameDetails {
  filePath: string;
  settings: GameStartType;
  frames: FramesType;
  stats: StatsType;
  metadata: MetadataType;
  latestFrame: FrameEntryType | null;
  gameEnd: GameEndType | null;
}

export function processFile(file: File): GameDetails {
  console.log(`got filename: ${file.name}`);

  const fr = new FileReaderSync();
  const data = fr.readAsArrayBuffer(file);
  const buf = Buffer.from(data);
  const game = new SlippiGame(buf);
  //   console.log(game.getSettings());
  //   const details = generateGameDetails(file.name, game);
  //   return {
  //     game,
  //     details,
  //   };

  //   const arr = new Int8Array(data);
  //   const buf = Buffer.from(data); //arr);
  //   const game = null as SlippiGame;
  const details = generateGameDetails(file.name, game);
  return details;
  //   return {
  //     game,
  //     details,
  //   };
}

// export async function asyncProcessFile(file: File): Promise<GameDetails> {
//   const data = await readFileAsArrayBuffer(file);
//   const buf = Buffer.from(data);
//   const game = new SlippiGame(buf);
//   const details = generateGameDetails(file.name, game);
//   return details;
// }

export function readFileAsArrayBuffer(file: File): ArrayBuffer {
  const fr = new FileReaderSync();
  const data = fr.readAsArrayBuffer(file);
  const buf = Buffer.from(data);
  return buf;
}

// async function readFileAsArrayBuffer(file: File): Promise<string | ArrayBufferLike> {
//   return new Promise((resolve, reject) => {
//     const fr = new FileReader();
//     fr.onabort = () => reject("file reading was aborted");
//     fr.onerror = () => reject("file reading has failed");
//     if (fr.readAsBinaryString) {
//       fr.addEventListener(
//         "load",
//         function () {
//           const string = (this as any).resultString != null ? (this as any).resultString : this.result;
//           const result = new Uint8Array(string.length);
//           for (let i = 0; i < string.length; i++) {
//             result[i] = string.charCodeAt(i);
//           }
//           resolve(result.buffer);
//         },
//         false
//       );
//       fr.readAsBinaryString(file);
//     } else {
//       fr.addEventListener(
//         "load",
//         function () {
//           if (this.result) {
//             resolve(this.result);
//           } else {
//             reject("no data read");
//           }
//         },
//         false
//       );
//       fr.readAsArrayBuffer(file);
//     }
//   });
// }
