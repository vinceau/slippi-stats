/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { DropPad } from "components/DropPad";
import { FileList } from "components/FileList";
import { processStats } from "lib/processStats";
import { GameDetails, generateGameDetails, readFileAsSlippiGame } from "lib/readFile";
import { generateSearchParams } from "lib/searchParams";
import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { defaultTheme } from "styles/theme";

import { AppContext, Types } from "../store";

const ProcessButton = styled.button<{
  backgroundColor: string;
  color: string;
}>`
  background: ${(p) => p.backgroundColor};
  border: none;
  color: ${(p) => p.color};
  cursor: pointer;
  font: inherit;
  padding: 1rem 0rem;
  width: 100%;
  font-weight: 700;
  font-size: 3rem;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:enabled {
    opacity: 1;
  }
`;

export const FileListInput: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const onClick = () => {
    const gameDetails = state.files.filter((f) => f.details !== null).map((f) => f.details as GameDetails);
    const params = processStats(gameDetails);
    const search = "?" + generateSearchParams(params).toString();
    history.push({
      pathname: "/render",
      search,
    });
  };

  const onRemove = (filename: string) => {
    dispatch({
      type: Types.REMOVE_FILE,
      payload: {
        filename,
      },
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const startTime = new Date().getTime();
      const promises = acceptedFiles.map(async (file) => {
        dispatch({
          type: Types.ADD_FILE,
          payload: {
            filename: file.name,
          },
        });
        try {
          const game = await readFileAsSlippiGame(file);
          const details = generateGameDetails(file.name, game);
          dispatch({
            type: Types.ADD_GAME,
            payload: {
              filename: file.name,
              game,
              details,
            },
          });
        } catch (err) {
          dispatch({
            type: Types.SET_ERROR,
            payload: {
              filename: file.name,
              error: err,
            },
          });
        }
      });
      Promise.all(promises).then(() => {
        const time = new Date().getTime() - startTime;
        console.log(`Finished processing in ${time}ms`);
      });
    },
    [dispatch]
  );

  const finishedProcessing = !state.files.find((f) => f.loading);
  const buttonText =
    state.files.length === 0 ? "NO FILES ADDED" : finishedProcessing ? "GENERATE STATS" : "PLEASE WAIT";
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 100%;
        grid-row-gap: 1rem;
      `}
    >
      <DropPad accept=".slp" onDrop={onDrop} />
      <FileList files={state.files} onRemove={onRemove} />
      <ProcessButton
        backgroundColor={defaultTheme.primaryColor}
        color="white"
        disabled={state.files.length === 0 || !finishedProcessing}
        onClick={onClick}
      >
        {buttonText}
      </ProcessButton>
    </div>
  );
};
