/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FileListInput } from "containers/FileListInput";
import React from "react";
import { useHistory } from "react-router-dom";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const MainView: React.FC = () => {
  const history = useHistory();

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
    <div
      css={css`
        margin: 0 12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1>Slippi Stats</h1>
      <button onClick={onClick}>randomize</button>
      <FileListInput />
    </div>
  );
};
