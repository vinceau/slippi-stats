import { ButtonInput } from "react-gamecube";

export enum InputBit {
  D_LEFT = 0x0001,
  D_RIGHT = 0x0002,
  D_DOWN = 0x0004,
  D_UP = 0x0008,
  Z = 0x0010,
  R = 0x0020,
  L = 0x0040,
  A = 0x0100,
  B = 0x0200,
  X = 0x0400,
  Y = 0x0800,
  START = 0x1000,
}

export const inputBitToName = new Map<string, InputBit>()
  .set(ButtonInput.D_LEFT, InputBit.D_LEFT)
  .set(ButtonInput.D_RIGHT, InputBit.D_RIGHT)
  .set(ButtonInput.D_DOWN, InputBit.D_DOWN)
  .set(ButtonInput.D_UP, InputBit.D_UP)
  .set(ButtonInput.Z, InputBit.Z)
  .set(ButtonInput.R, InputBit.R)
  .set(ButtonInput.L, InputBit.L)
  .set(ButtonInput.A, InputBit.A)
  .set(ButtonInput.B, InputBit.B)
  .set(ButtonInput.X, InputBit.X)
  .set(ButtonInput.Y, InputBit.Y)
  .set(ButtonInput.START, InputBit.START);
