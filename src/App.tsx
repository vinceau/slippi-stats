import "./App.scss";

import React from "react";
import { hot } from "react-hot-loader/root";

import { AppProvider } from "./store";
import { ButtonMaskInput } from "./containers/ButtonMaskInput";
import SlippiGame from "@slippi/slippi-js";
import { DropPad } from "./components/DropPad";
import { readFileAsArrayBuffer } from "./lib/readFile";
// import fs from "fs";

/*
function readFileAsArrayBuffer(
  file: any,
  success: (res: string | ArrayBufferLike | null) => void,
  error?: (err: any) => void
): void {
  // const files = fs.readdirSync(".");
  // console.log(files);
  var fr = new FileReader();
  if (error) {
    fr.addEventListener("error", error, false);
  }
  if (fr.readAsBinaryString) {
    fr.addEventListener(
      "load",
      function () {
        var string = (this as any).resultString != null ? (this as any).resultString : this.result;
        var result = new Uint8Array(string.length);
        for (var i = 0; i < string.length; i++) {
          result[i] = string.charCodeAt(i);
        }
        success(result.buffer);
      },
      false
    );
    return fr.readAsBinaryString(file);
  } else {
    fr.addEventListener(
      "load",
      function () {
        success(this.result);
      },
      false
    );
    return fr.readAsArrayBuffer(file);
  }
}
*/

const App: React.FC = () => {
  const showFile = (event: any) => {
    const files = event.target.files;
    const file = files[0];
    console.log(file.name);
    // readFileAsArrayBuffer(file, (data) => {
    //   if (data) {
    //     if (typeof data === "string") {
    //       console.log(data);
    //     } else {
    //       const arr = new Int8Array(data);
    //       // console.log(arr);
    //       const buf = Buffer.from(arr);
    //       console.log(buf);
    //       const game = new SlippiGame(buf);
    //       console.log(game.getStats());
    //     }
    //   }
    // });
  };
  const onDrop = (files: File[]) => {
    files.forEach(async (f) => {
      console.log("checking file: ", f);
      const data = await readFileAsArrayBuffer(f);
      if (typeof data === "string") {
        console.log(data);
      } else {
        const arr = new Int8Array(data);
        // console.log(arr);
        const buf = Buffer.from(arr);
        console.log(buf);
        const game = new SlippiGame(buf);
        console.log(game.getStats());
      }
    });
  };
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <input type="file" onChange={showFile} />
          <h1>Slippi Head-2-Head</h1>
          <DropPad files={[]} onDrop={onDrop} />
        </header>
      </div>
    </AppProvider>
  );
};

export default hot(App);
