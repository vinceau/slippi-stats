/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Block } from "components/Block";
import { InlineEdit } from "components/InlineEdit";
import { useParam } from "lib/hooks";
import React from "react";

export interface ScoreBlockProps {
  primaryColor: string;
}

const StyledBlock = styled(Block)`
  padding: 0.5rem 4rem;
  font-size: 5rem;
  font-weight: 800;
`;

export const ScoreBlock: React.FC<ScoreBlockProps> = (props) => {
  const [score, setScore] = useParam("score", "0 - 0");
  return (
    <StyledBlock color="white" backgroundColor={props.primaryColor}>
      <InlineEdit text={score} onSetText={setScore} />
    </StyledBlock>
  );
};
