/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { DropPad } from "components/DropPad";
import { generateGameDetails, readFileAsSlippiGame } from "lib/readFile";
import React, { useCallback, useContext } from "react";

import { AppContext, Types } from "../store";

export const ButtonMaskInput: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
  }, []);

  const finishedProcessing = !Boolean(state.files.find((f) => f.loading));
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
      {state.files.map((f) => (
        <div key={f.file.name}>
          {f.file.name} {f.loading && <span>processing...</span>}
        </div>
      ))}
      {finishedProcessing ? <div>done</div> : <div>still processing...</div>}
    </div>
  );
};
