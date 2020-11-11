/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { DropPad } from "components/DropPad";
import { FileList } from "components/FileList";
import { GameDetails, generateGameDetails, readFileAsSlippiGame } from "lib/readFile";
import React, { useCallback, useContext } from "react";
import styled from "@emotion/styled";
import generateStats from "lib/stats";

import { AppContext, Types } from "../store";
import { processStats } from "lib/processStats";
import { useHistory } from "react-router-dom";

const ProcessButton = styled.button`
  background: #286163;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 1rem 0rem;
  width: 100%;
  font-weight: 700;
  font-size: 3rem;
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const FileListInput: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [stats, setStats] = React.useState<any>(null);

  const onClick = () => {
    const gameDetails = state.files.filter((f) => f.details !== null).map((f) => f.details as GameDetails);
    // const s = generateStats(gameDetails);
    // setStats(s);
    const params = processStats(gameDetails);
    const search = "?" + params.toString();
    history.push({
      pathname: "/render",
      search,
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file) => {
        dispatch({
          type: Types.ADD_FILE,
          payload: {
            file,
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
    },
    [dispatch]
  );

  const finishedProcessing = !state.files.find((f) => f.loading);
  const ready = state.files.length === 0 || finishedProcessing;
  const buttonText = ready ? "COMPUTE STATS" : "PLEASE WAIT";
  return (
    <div
      css={css`
        position: relative;
        border: solid 1px black;
        height: 500px;
        width: 500px;
      `}
    >
      <DropPad accept=".slp" onDrop={onDrop} />
      <FileList files={state.files} />
      {finishedProcessing ? <div>done</div> : <div>still processing...</div>}
      <ProcessButton disabled={state.files.length === 0 || !finishedProcessing} onClick={onClick}>
        {buttonText}
      </ProcessButton>
      <textarea readOnly value={JSON.stringify(stats, null, 2)} />
    </div>
  );
};
