import { css } from "@emotion/core";

export const hasOpacity = (initial: number, final = 1, transition = "opacity 0.2s ease-in-out") => css`
  opacity: ${initial};
  transition: ${transition};
  &:hover {
    opacity: ${final};
  }
`;
