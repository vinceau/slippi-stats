import styled from "@emotion/styled";
import React from "react";

import { InlineEdit } from "../InlineEdit";
import { Block } from "./Block";

export interface EditBlockProps {
  color: string;
  backgroundColor: string;
  value: string;
  placeholder?: string;
  onEdit: (val: string) => void;
}

export const EditBlock: React.FC<EditBlockProps> = ({ onEdit, backgroundColor, value, color }) => {
  return (
    <Block color={color} backgroundColor={backgroundColor}>
      <InlineEdit text={value} onSetText={onEdit} />
    </Block>
  );
};

const OptionalBlock = styled(Block)<{
  show?: boolean;
}>`
  opacity: ${(p) => (p.show ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
  position: relative;
  &:hover {
    opacity: 1;
    z-index: 10;
  }
`;

export const OptionalEditBlock: React.FC<EditBlockProps> = ({ onEdit, backgroundColor, value, color, placeholder }) => {
  const [focused, setFocused] = React.useState(false);
  const show = focused || Boolean(value);
  return (
    <OptionalBlock show={show} color={color} backgroundColor={backgroundColor}>
      <InlineEdit
        text={value}
        onSetText={onEdit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
      />
    </OptionalBlock>
  );
};

OptionalEditBlock.defaultProps = {
  placeholder: "click to edit",
};
