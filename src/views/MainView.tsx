/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FileListInput } from "containers/FileListInput";
import { generateDemoQuery } from "lib/demo";
import React from "react";
import { useHistory } from "react-router-dom";
import { defaultTheme, GlobalTheme } from "styles/theme";

import Worker from "../worker";

// Create new instance
const instance = new Worker();

export const MainView: React.FC = () => {
  const history = useHistory();
  const [counter, setCounter] = React.useState(0);
  const [fibIndex, setFibIndex] = React.useState("");
  const [fibResult, setFibResult] = React.useState("");

  const onClick = () => {
    const paramMap = generateDemoQuery();
    const search = "?" + new URLSearchParams(paramMap).toString();
    history.push({
      pathname: "/render",
      search,
    });
  };

  const calcFib = async () => {
    const num = +fibIndex;
    if (num < 2) {
      setFibResult("error: number needs to be greater than 2");
      return;
    }

    const processed = await instance.processData(num);
    setFibResult(processed);
  };

  return (
    <div
      css={css`
        margin: 0 12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <GlobalTheme {...defaultTheme} />
      <h1>Slippi Stats</h1>
      <button onClick={onClick}>randomize</button>
      <FileListInput />
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
        `}
      >
        <div>{counter}</div>
        <button onClick={() => setCounter(counter - 1)}>dec</button>
        <button onClick={() => setCounter(counter + 1)}>inc</button>
        <div>
          <input value={fibIndex} onChange={(e) => setFibIndex(e.target.value)} />
          <button onClick={calcFib}>calculate fib</button>
          <div>{fibResult}</div>
        </div>
      </div>
    </div>
  );
};
