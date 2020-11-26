/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { DropPad } from "components/DropPad";
import { ErrorMessage } from "components/ErrorMessage";
import { FileList } from "components/FileList";
import { readFileAsGameDetails } from "lib/readFile";
import { generateSearchParams } from "lib/searchParams";
import { generateStatParams } from "lib/stats";
import { GameDetails, Stat } from "lib/stats/types";
import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { hasOpacity } from "styles/opacity";

import { AppContext, Types } from "../store";
import { CustomStatsList, StatOptions } from "./CustomStatsList";

const DEFAULT_STATS = [Stat.OPENINGS_PER_KILL, Stat.DAMAGE_DONE, Stat.AVG_KILL_PERCENT, Stat.NEUTRAL_WINS];

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

const getDefaultStats = (): StatOptions => {
  const restoredStatsString = localStorage.getItem("statOptions");
  if (restoredStatsString) {
    return JSON.parse(restoredStatsString);
  }
  return DEFAULT_STATS.map((s) => ({
    statId: s,
    enabled: true,
  }));
};

const generateStatsList = (options: StatOptions): string[] => {
  const statsList = options.filter((s) => s.enabled).map((s) => s.statId);
  return [Stat.KILL_MOVES, Stat.NEUTRAL_OPENER_MOVES, "", ...statsList];
};

export const FileListInput: React.FC<{ buttonColor: string }> = ({ buttonColor }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = React.useState<any>(null);
  const [showOptions, setShowOptions] = React.useState(false);
  const [statOptions, setStatOptions] = React.useState<StatOptions>(getDefaultStats());

  const onStatOptionChange = (options: StatOptions) => {
    localStorage.setItem("statOptions", JSON.stringify(options));
    setStatOptions(options);
  };

  const onClick = () => {
    try {
      const gameDetails = state.files.filter((f) => f.details !== null).map((f) => f.details as GameDetails);
      const params = generateStatParams(gameDetails, generateStatsList(statOptions));
      const search = "?" + generateSearchParams(params).toString();
      history.push({
        pathname: "/render",
        search,
      });
    } catch (err) {
      console.error(error);
      setError(err);
    }
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
      // Track how long processing takes
      const startTime = new Date().getTime();

      // First add all the files to the store
      dispatch({
        type: Types.ADD_FILES,
        payload: {
          files: acceptedFiles,
        },
      });

      const promises = acceptedFiles.map(async (file) => {
        try {
          const details = await readFileAsGameDetails(file);
          dispatch({
            type: Types.SET_DETAILS,
            payload: {
              filename: file.name,
              details,
            },
          });
        } catch (err) {
          console.error(error);
          dispatch({
            type: Types.SET_ERROR,
            payload: {
              filename: file.name,
              error: err,
            },
          });
        }
      });

      // Print the time taken when complete
      Promise.all(promises).then(() => {
        const time = new Date().getTime() - startTime;
        console.log(`Finished processing in ${time}ms`);
      });
    },
    [dispatch, error]
  );

  const finishedProcessing = !state.files.find((f) => f.loading);
  const buttonText =
    state.files.length === 0 ? "NO FILES ADDED" : finishedProcessing ? "GENERATE STATS" : "PLEASE WAIT";

  if (showOptions) {
    return <CustomStatsList onClose={() => setShowOptions(false)} value={statOptions} onChange={onStatOptionChange} />;
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        width: 100%;
        height: 100%;
      `}
    >
      <DropPad accept=".slp" onDrop={onDrop} />
      <div
        css={css`
          overflow: auto;
          display: flex;
          flex-direction: column;
          margin: 1rem 0;
        `}
      >
        <FileList files={state.files} onRemove={onRemove} />
      </div>
      <div>
        <ProcessButton
          backgroundColor={buttonColor}
          color="white"
          disabled={state.files.length === 0 || !finishedProcessing}
          onClick={onClick}
        >
          {buttonText}
        </ProcessButton>
        <div
          css={css`
            text-align: center;
            margin-top: 0.5rem;
            font-size: 1.4rem;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
            ${hasOpacity(0.5)}
          `}
          onClick={() => setShowOptions(true)}
        >
          show advanced options
        </div>
      </div>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};
