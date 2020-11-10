import { ButtonInput } from "react-gamecube";
import { InputBit, inputBitToName } from "./types";

export function isButtonPressed(bitmask: number, button: InputBit): boolean {
  return (bitmask & button) === button;
}

export function bitmaskToButtons(bitmask: number): ButtonInput[] {
  const inputs = new Array<string>();
  inputBitToName.forEach((mask, name) => {
    if (isButtonPressed(bitmask, mask)) {
      inputs.push(name);
    }
  });
  return inputs as ButtonInput[];
}
