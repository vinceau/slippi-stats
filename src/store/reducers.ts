import SlippiGame from "@slippi/slippi-js";

import { GameDetails, InitialStateType } from "./types";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  ADD_GAME = "ADD_GAME",
  SET_ERROR = "SET_ERROR",
  ADD_FILE = "ADD_FILE",
}

type ActionPayload = {
  [Types.ADD_GAME]: {
    filename: string;
    game: SlippiGame;
    details: GameDetails;
  };
  [Types.SET_ERROR]: {
    filename: string;
    error: any;
  };
  [Types.ADD_FILE]: {
    file: File;
  };
};

export type ReducerActions = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

export const reducer = (state: InitialStateType, action: ReducerActions) => {
  switch (action.type) {
    case Types.ADD_GAME: {
      const { filename, game, details } = action.payload;
      const files = state.files;
      const fileToReplace = files.findIndex((f) => f.file.name === filename);
      if (fileToReplace !== -1) {
        files[fileToReplace].game = game;
        files[fileToReplace].details = details;
        files[fileToReplace].loading = false;
      }
      return {
        ...state,
        files,
      };
    }
    case Types.SET_ERROR: {
      const { filename, error } = action.payload;
      const files = state.files;
      const fileToReplace = files.findIndex((f) => f.file.name === filename);
      if (fileToReplace !== -1) {
        files[fileToReplace].error = error;
        files[fileToReplace].loading = false;
      }
      return {
        ...state,
        files,
      };
    }
    case Types.ADD_FILE: {
      const { file } = action.payload;
      const files = state.files;
      const alreadyExists = Boolean(files.find((f) => f.file.name === file.name));
      if (!alreadyExists) {
        files.push({
          file,
          loading: true,
          game: null,
          details: null,
        });
      }
      return {
        ...state,
        files,
      };
    }
    default:
      return state;
  }
};