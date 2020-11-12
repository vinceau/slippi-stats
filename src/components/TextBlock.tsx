/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import React from "react";
import { InlineEdit } from "./InlineEdit";

export interface TextBlockProps {
  color: string;
  backgroundColor: string;
  value: string;
  onEdit?: (val: string) => void;
}

const Title = styled.div<{
  color: string;
  backgroundColor: string;
}>`
  color: ${(p) => p.color};
  background-color: ${(p) => p.backgroundColor};
  text-align: center;
  padding: 0.3em 2.5em;
  font-size: 1.2em;
  box-shadow: 0.2em 0.2em 0.2em black;
`;

export const TextBlock: React.FC<TextBlockProps> = ({ onEdit, backgroundColor, value, color }) => {
  const child = onEdit ? <InlineEdit text={value} onSetText={onEdit} /> : value;
  return (
    <Title color={color} backgroundColor={backgroundColor}>
      {child}
    </Title>
  );
};
