import styled from "@emotion/styled";
import { hasOpacity } from "styles/opacity";

export const PrimaryButton = styled.button<{
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

export const SecondaryButton = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${hasOpacity(0.5)}
`;
