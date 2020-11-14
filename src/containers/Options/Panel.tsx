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
  const existingLeftColor = localStorage.getItem(leftColorParam);
  const existingRightColor = localStorage.getItem(rightColorParam);
  const [leftColor, setLeftColor] = useParam(leftColorParam, existingLeftColor || leftDefault);
  const [rightColor, setRightColor] = useParam(rightColorParam, existingRightColor || rightDefault);

  const onLeftColorChange = (color: string) => {
    localStorage.setItem(leftColorParam, color);
    setLeftColor(color);
  };

  const onRightColorChange = (color: string) => {
    localStorage.setItem(rightColorParam, color);
    setRightColor(color);
  };

  return (
    <Panel title={panelLabel}>
      <DualColorPicker
        leftLabel={leftLabel}
        rightLabel={rightLabel}
        leftColor={leftColor}
        rightColor={rightColor}
        onLeftColorChange={onLeftColorChange}
        onRightColorChange={onRightColorChange}
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
