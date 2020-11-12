import styled from "@emotion/styled";

export const Block = styled.div<{
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
