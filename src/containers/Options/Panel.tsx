/** @jsx jsx */ import { css, jsx } from "@emotion/core";
import { DualColorPicker } from "components/DualColorPicker";
import { useParam } from "lib/hooks";
import React from "react";

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
    <Panel title={panelLabel}>
      <DualColorPicker
        leftLabel={leftLabel}
        rightLabel={rightLabel}
        leftColor={leftColor}
        rightColor={rightColor}
        onLeftColorChange={setLeftColor}
        onRightColorChange={setRightColor}
      />
    </Panel>
  );
};

const Panel: React.FC<{ title: string }> = (props) => {
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
        {props.title}
      </div>
      {props.children}
    </div>
  );
};
