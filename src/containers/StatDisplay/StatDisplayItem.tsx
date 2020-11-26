import styled from "@emotion/styled";
import { hasOpacity } from "styles/opacity";

export const StatDisplayItem = styled.div<{
  hasItem: boolean;
  isDragging?: boolean;
  isDraggingOver?: boolean;
}>`
  padding: 1rem 0;
  user-select: none;
  .remove {
    display: none;
    position: absolute;
    top: -20%;
    right: 20%;
    padding: 0.5rem 1.5rem;
    color: black;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    ${hasOpacity(0.4, 0.8)}
  }
  ${(p) =>
    !p.hasItem || p.isDraggingOver
      ? ""
      : `
  &:hover {
    .remove {
      display: block;
    }
  };
  `}
`;
