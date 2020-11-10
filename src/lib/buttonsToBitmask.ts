import { InputBit, inputBitToName } from "./types";

const generateInputBitmaskFromBit = (...buttons: InputBit[]): number => {
  return buttons.reduce((a, b) => a | b, 0);
};

export const generateInputBitmask = (...buttons: string[]): number => {
  const mappedButtons = buttons.map((b) => mapInputToBits(b));
  return generateInputBitmaskFromBit(...mappedButtons);
};

const mapInputToBits = (button: string): InputBit => {
  const b = inputBitToName.get(button);
  if (!b) {
    throw new Error(`Unknown input: ${button}`);
  }
  return b;
};
