/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FileListInput } from "containers/FileListInput";
import { generateDemoQuery } from "lib/demo";
import React from "react";
import { useHistory } from "react-router-dom";
import { defaultTheme, GlobalTheme } from "styles/theme";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const MainView: React.FC = () => {
  const history = useHistory();

  const onClick = () => {
    const paramMap = generateDemoQuery();
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
      <GlobalTheme {...defaultTheme} />
      <h1>Slippi Stats</h1>
      <button onClick={onClick}>randomize</button>
      <FileListInput />
    </div>
  );
};
