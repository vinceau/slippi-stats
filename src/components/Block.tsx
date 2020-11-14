import styled from "@emotion/styled";

export const Block = styled.div<{
  color: string;
  backgroundColor: string;
}>`
  color: ${(p) => p.color};
  background-color: ${(p) => p.backgroundColor};
  text-align: center;
  padding: 0.3em 0;
  font-size: 1.2em;
  box-shadow: 0.2em 0.2em 0.2em black;
`;
