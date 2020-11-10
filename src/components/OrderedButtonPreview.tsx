import React from "react";
import { ButtonInput } from "react-gamecube";

const orderedInputs = [
  ButtonInput.Z,
  ButtonInput.L,
  ButtonInput.R,
  ButtonInput.A,
  ButtonInput.B,
  ButtonInput.X,
  ButtonInput.Y,
  ButtonInput.START,
  ButtonInput.D_UP,
  ButtonInput.D_DOWN,
  ButtonInput.D_LEFT,
  ButtonInput.D_RIGHT,
];

export const OrderedButtonPreview: React.FC<{
  value: string[];
  separator?: string;
}> = (props) => {
  const separator = props.separator || " + ";
  return <span>{orderedInputs.filter((i) => props.value.includes(i)).join(separator)}</span>;
};
