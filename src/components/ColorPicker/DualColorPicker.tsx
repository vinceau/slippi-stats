/** @jsx jsx */ import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { ColorPicker } from "components/ColorPicker";
import React from "react";

const ColorContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
`;

const ColorLabel = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
`;

export interface DualColorPickerProps {
  leftLabel: string;
  rightLabel: string;
  leftColor: string;
  rightColor: string;
  defaultLeftColor?: string;
  defaultRightColor?: string;
  onLeftColorChange: (color: string) => void;
  onRightColorChange: (color: string) => void;
}

export const DualColorPicker: React.FC<DualColorPickerProps> = (props) => {
  const {
    defaultLeftColor,
    defaultRightColor,
    leftLabel,
    rightLabel,
    leftColor,
    rightColor,
    onLeftColorChange,
    onRightColorChange,
  } = props;
  return (
    <div
      css={css`
        display: grid;
        grid-column-gap: 2.5rem;
        grid-template-columns: repeat(2, 1fr);
      `}
    >
      <ColorContainer
        css={css`
          justify-self: end;
        `}
      >
        <ColorLabel>{leftLabel}</ColorLabel>
        <div>
          <ColorPicker value={leftColor} onChange={onLeftColorChange} defaultColor={defaultLeftColor} />
        </div>
      </ColorContainer>
      <ColorContainer
        css={css`
          justify-self: start;
        `}
      >
        <div>
          <ColorPicker value={rightColor} onChange={onRightColorChange} defaultColor={defaultRightColor} />
        </div>
        <ColorLabel>{rightLabel}</ColorLabel>
      </ColorContainer>
    </div>
  );
};
