import SlippiGame from "@slippi/slippi-js";
import { GameDetails } from "lib/readFile";

import { InitialStateType, ProcessedFile } from "./types";

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
  ADD_FILES = "ADD_FILES",
  REMOVE_FILE = "REMOVE_FILE",
  CLEAR_ALL = "CLEAR_ALL",
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
  [Types.ADD_FILES]: {
    files: File[];
  };
  [Types.REMOVE_FILE]: {
    filename: string;
  };
  [Types.CLEAR_ALL]: never;
};

export type ReducerActions = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

export const reducer = (state: InitialStateType, action: ReducerActions) => {
  switch (action.type) {
    case Types.ADD_GAME: {
      const { filename, details } = action.payload;
      const files = state.files;
      const fileToReplace = files.findIndex((f) => f.filename === filename);
      if (fileToReplace !== -1) {
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
      const fileToReplace = files.findIndex((f) => f.filename === filename);
      if (fileToReplace !== -1) {
        files[fileToReplace].error = error;
        files[fileToReplace].loading = false;
      }
      return {
        ...state,
        files,
      };
    }
    case Types.ADD_FILES: {
      const { files } = action.payload;
      const currentFiles = state.files;
      let newFiles: ProcessedFile[] = files.map((f) => ({
        filename: f.name,
        loading: true,
        details: null,
      }));

      // Make sure there are no duplicate filenames
      newFiles = newFiles.filter((f) => !currentFiles.find((existingFile) => f.filename === existingFile.filename));

      return {
        ...state,
        files: [...currentFiles, ...newFiles],
      };
    }
    case Types.REMOVE_FILE: {
      const { filename } = action.payload;
      const files = state.files.filter((f) => f.filename !== filename);
      return {
        ...state,
        files,
      };
    }
    case Types.CLEAR_ALL: {
      return {
        ...state,
        files: [],
      };
    }
    default:
      return state;
  }
};
