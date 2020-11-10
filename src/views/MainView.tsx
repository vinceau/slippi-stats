/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import React from "react";
import { useHistory } from "react-router-dom";

import { DropPad } from "../components/DropPad";
import { generateStatsOutput } from "../lib/readFile";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const MainView: React.FC = () => {
  const history = useHistory();
  const [stats, setStats] = React.useState<any>(null);
  const onDrop = async (files: File[]) => {
    const stats = await generateStatsOutput(files);
    setStats(stats);
  };

  const onClick = () => {
    const params = ["mckm1", "mckm2", "mcno1", "mcno2", "opk1", "opk2", "tdd1", "tdd2", "dpo1", "dpo2", "ipm1", "ipm2"];
    const paramMap = params.reduce((val, key) => {
      const randomVal = getRandomArbitrary(50, 250);
      return { ...val, [key]: randomVal.toFixed(1) };
    }, {} as any);
    const search = "?" + new URLSearchParams(paramMap).toString();
    history.push({
      pathname: "/render",
      search,
    });
  };

  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={onClick}>randomize</button>
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
