import { InitialStateType } from "./types";
import { bitmaskToButtons } from "../lib/bitmaskToButtons";
import { ButtonInput } from "react-gamecube";
import { generateInputBitmask } from "../lib/buttonsToBitmask";

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
  SetBitmask = "SET_BITMASK",
  ToggleButton = "TOGGLE_BUTTON",
}

type ActionPayload = {
  [Types.SetBitmask]: {
    mask: number;
  };
  [Types.ToggleButton]: {
    button: ButtonInput;
  };
};

export type ReducerActions = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

export const reducer = (state: InitialStateType, action: ReducerActions) => {
  switch (action.type) {
    case Types.SetBitmask:
      const { payload } = action;
      const newState = { ...state };
      newState.mask = payload.mask;
      newState.buttons = bitmaskToButtons(payload.mask);
      return newState;
    case Types.ToggleButton:
      const { button } = action.payload;
      let newButtons = [...state.buttons];
      if (state.buttons.includes(button)) {
        // remove button from state
        newButtons = newButtons.filter((b) => b !== button);
      } else {
        // add button to state
        newButtons.push(button);
      }
      return {
        ...state,
        buttons: newButtons,
        mask: generateInputBitmask(...newButtons),
      };
    default:
      return state;
  }
};
