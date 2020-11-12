/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { DropPad } from "components/DropPad";
import { FileList } from "components/FileList";
import { processStats } from "lib/processStats";
import { GameDetails, generateGameDetails, readFileAsArrayBuffer, readFileAsSlippiGame } from "lib/readFile";
import generateStats from "lib/stats";
import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AppContext, Types } from "../store";

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
      const startTime = new Date().getTime();
      const promises = acceptedFiles.map(async (file) => {
        dispatch({
          type: Types.ADD_FILE,
          payload: {
            filename: file.name,
          },
        });
        try {
          const data = (await readFileAsArrayBuffer(file)) as ArrayBuffer;
          console.log(`${file.name} has ${data.byteLength} length`);
          // const game = await readFileAsSlippiGame(file);
          // const details = generateGameDetails(file.name, game);
          // dispatch({
          //   type: Types.ADD_GAME,
          //   payload: {
          //     filename: file.name,
          //     game,
          //     details,
          //   },
          // });
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
        console.log(`Processed in ${time}ms`);
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
