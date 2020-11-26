import styled from "@emotion/styled";

export const MainButton = styled.button<{
  backgroundColor: string;
  color: string;
}>`
  background: ${(p) => p.backgroundColor};
  border: none;
  color: ${(p) => p.color};
  cursor: pointer;
  font: inherit;
  padding: 1rem 0rem;
  width: 100%;
  font-weight: 700;
  font-size: 3rem;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:enabled {
    opacity: 1;
  }
`;
