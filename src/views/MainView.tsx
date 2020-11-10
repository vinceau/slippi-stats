/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import React from "react";

import { DropPad } from "../components/DropPad";
import { generateStatsOutput } from "../lib/readFile";

export const MainView: React.FC = () => {
  const [stats, setStats] = React.useState<any>(null);
  const onDrop = async (files: File[]) => {
    const stats = await generateStatsOutput(files);
    setStats(stats);
  };
  return (
    <div>
      <h1>Hello world</h1>
      {/* <DropPad files={[]} onDrop={onDrop} />
      <div
        css={css`
          text-align: left;
        `}
      >
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      </div> */}
    </div>
  );
};
