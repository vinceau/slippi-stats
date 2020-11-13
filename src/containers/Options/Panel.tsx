/** @jsx jsx */ import { css, jsx } from "@emotion/core";
import React from "react";
import { ColorPicker } from "components/ColorPicker";
import styled from "@emotion/styled";
import { useParam } from "lib/hooks";

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

export interface DualColorPanelProps {
  panelLabel: string;
  leftLabel: string;
  leftColorParam: string;
  leftDefault: string;
  rightLabel: string;
  rightColorParam: string;
  rightDefault: string;
}

export const DualColorPanel: React.FC<DualColorPanelProps> = (props) => {
  const { panelLabel, leftLabel, leftColorParam, leftDefault, rightLabel, rightColorParam, rightDefault } = props;
  const [leftColor, setLeftColor] = useParam(leftColorParam, leftDefault);
  const [rightColor, setRightColor] = useParam(rightColorParam, rightDefault);

  return (
    <div>
      <div
        css={css`
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 800;
          font-size: 2rem;
        `}
      >
        {panelLabel}
      </div>
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
            <ColorPicker value={leftColor} onChange={setLeftColor} />
          </div>
        </ColorContainer>
        <ColorContainer
          css={css`
            justify-self: start;
          `}
        >
          <div>
            <ColorPicker value={rightColor} onChange={setRightColor} />
          </div>
          <ColorLabel>{rightLabel}</ColorLabel>
        </ColorContainer>
      </div>
    </div>
  );
};
