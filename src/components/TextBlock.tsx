/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import React from "react";
import { InlineEdit } from "./InlineEdit";

export interface TextBlockProps {
  color: string;
  backgroundColor: string;
  value: string;
  optional?: boolean;
  onEdit?: (val: string) => void;
}

const Title = styled.div<{
  color: string;
  backgroundColor: string;
  optional?: boolean;
  show?: boolean;
}>`
  color: ${(p) => p.color};
  background-color: ${(p) => p.backgroundColor};
  text-align: center;
  padding: 0.3em 2.5em;
  font-size: 1.2em;
  box-shadow: 0.2em 0.2em 0.2em black;
  ${(p) =>
    p.optional &&
    `
  opacity: ${p.show ? 1 : 0};
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: 1;
  }
  `};
`;

export const TextBlock: React.FC<TextBlockProps> = ({ optional, onEdit, backgroundColor, value, color }) => {
  const child = onEdit ? <InlineEdit text={value} onSetText={onEdit} /> : value;
  return (
    <Title optional={optional} show={Boolean(value)} color={color} backgroundColor={backgroundColor}>
      {child}
    </Title>
  );
};
