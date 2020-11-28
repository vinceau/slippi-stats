/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
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

export const SecondaryButton: React.FC<Record<string, any>> = (props) => {
  const { align, children, ...rest } = props;
  const alignment = align || "center";
  return (
    <div
      css={css`
        user-select: none;
        text-align: ${alignment};
      `}
    >
      <span
        css={css`
          display: inline-block;
          font-size: 1.4rem;
          cursor: pointer;
          margin: 0.5rem 0;
          padding: 0 0.5rem;
          ${hasOpacity(0.5)}
          &:hover {
            text-decoration: underline;
          }
        `}
        {...rest}
      >
        {children}
      </span>
    </div>
  );
};
