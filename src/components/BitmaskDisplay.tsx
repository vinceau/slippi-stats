/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

interface MaskDisplayProps {
  title: string;
}
const MaskDisplay: React.FC<MaskDisplayProps> = ({ title, children }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export interface BitmaskDisplayProps {
  mask: number;
}

export const BitmaskDisplay: React.FC<BitmaskDisplayProps> = ({ mask }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      `}
    >
      <MaskDisplay title="Binary">0b{mask.toString(2).padStart(16, "0")}</MaskDisplay>
      <MaskDisplay title="Decimal">{mask.toString()}</MaskDisplay>
      <MaskDisplay title="Hexadecimal">0x{mask.toString(16)}</MaskDisplay>
    </div>
  );
};
