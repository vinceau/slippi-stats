import React, { createContext, useReducer, type Dispatch } from "react";

import { reducer, type ReducerActions } from "./reducers";
import type { InitialStateType } from "./types";

const initialState: InitialStateType = {
  files: [],
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ReducerActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state: InitialStateType, action: ReducerActions) => reducer(state, action);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
