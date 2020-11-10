/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import "./App.scss";

import React from "react";
import { hot } from "react-hot-loader/root";

import { AppProvider } from "./store";
import { DropPad } from "./components/DropPad";
import { generateStatsOutput } from "./lib/readFile";

const App: React.FC = () => {
  const [stats, setStats] = React.useState<any>(null);
  const onDrop = async (files: File[]) => {
    const stats = await generateStatsOutput(files);
    setStats(stats);
  };
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <h1>Slippi Head-2-Head</h1>
          <DropPad files={[]} onDrop={onDrop} />
          <div
            css={css`
              text-align: left;
            `}
          >
            <pre>{JSON.stringify(stats, null, 2)}</pre>
          </div>
        </header>
      </div>
    </AppProvider>
  );
};

export default hot(App);
