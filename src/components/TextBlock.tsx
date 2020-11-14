import React from "react";

import { Block } from "./Block";
import { InlineEdit } from "./InlineEdit";

export interface TextBlockProps {
  color: string;
  backgroundColor: string;
  value: string;
  optional?: boolean;
  onEdit?: (val: string) => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ optional, onEdit, backgroundColor, value, color }) => {
  const child = onEdit ? <InlineEdit text={value} onSetText={onEdit} /> : value;
  return (
    <Block optional={optional} show={Boolean(value)} color={color} backgroundColor={backgroundColor}>
      {child}
    </Block>
  );
};
