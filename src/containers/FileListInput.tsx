/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { DropPad } from "components/DropPad";
import { ErrorMessage } from "components/ErrorMessage";
import { FileList } from "components/FileList";
import { PrimaryButton, SecondaryButton } from "components/Buttons";
import { readFileAsGameDetails } from "lib/readFile";
import { generateSearchParams } from "lib/searchParams";
import { generateStatParams } from "lib/stats";
import { GameDetails, Stat } from "lib/stats/types";
import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { hasOpacity } from "styles/opacity";

import { AppContext, Types } from "../store";
import { StatOption, StatOptions } from "./StatOptions";

const ALL_STATS: string[] = [
  Stat.INPUTS_PER_MINUTE,
  Stat.DAMAGE_PER_OPENING,
  Stat.OPENINGS_PER_KILL,
  Stat.DAMAGE_DONE,
  Stat.AVG_KILL_PERCENT,
  Stat.NEUTRAL_WINS,
  Stat.L_CANCEL,
  Stat.FIRST_BLOOD,
];

const DEFAULT_STATS = [Stat.OPENINGS_PER_KILL, Stat.DAMAGE_DONE, Stat.AVG_KILL_PERCENT, Stat.NEUTRAL_WINS];

const getDefaultStats = (): StatOption[] => {
  const current = DEFAULT_STATS.map((s) => ({
    statId: s,
    enabled: true,
  }));
  return validateStatOptions(current);
};

const validateStatOptions = (current: StatOption[]): StatOption[] => {
  const newItems: StatOption[] = ALL_STATS.filter(
    (statId) => !current.find((option) => option.statId === statId)
  ).map((statId) => ({ statId, enabled: false }));

  // Make sure the ones we're showing are supported
  const currentItems = current.filter((c) => ALL_STATS.includes(c.statId));
  return [...currentItems, ...newItems];
};

const generateStatsList = (options: StatOption[]): string[] => {
  const statsList = options.filter((s) => s.enabled).map((s) => s.statId);
  return [Stat.KILL_MOVES, Stat.NEUTRAL_OPENER_MOVES, "", ...statsList];
};

export const FileListInput: React.FC<{ buttonColor: string }> = ({ buttonColor }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = React.useState<any>(null);
  const [showOptions, setShowOptions] = React.useState(false);

  let defaultStats = getDefaultStats();
  let statsModified = false;
  // Since we're persisting user options in localStorage, we need to be able to
  // handle the case where new options are available, yet not in their localStorage.
  const restoredStatsString = localStorage.getItem("statOptions");
  if (restoredStatsString) {
    statsModified = restoredStatsString !== JSON.stringify(defaultStats);
    defaultStats = JSON.parse(restoredStatsString);
  }

  const [statOptions, setStatOptions] = React.useState<StatOption[]>(defaultStats);

  const onStatOptionReset = () => {
    onStatOptionChange(getDefaultStats());
  };

  const onStatOptionChange = (options: StatOption[]) => {
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
    return (
      <StatOptions
        onClose={() => setShowOptions(false)}
        value={statOptions}
        onChange={onStatOptionChange}
        onReset={onStatOptionReset}
        hideReset={!statsModified}
      />
    );
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
        <PrimaryButton
          backgroundColor={buttonColor}
          color="white"
          disabled={state.files.length === 0 || !finishedProcessing}
          onClick={onClick}
        >
          {buttonText}
        </PrimaryButton>
        <SecondaryButton onClick={() => setShowOptions(true)}>customize stats</SecondaryButton>
      </div>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};
