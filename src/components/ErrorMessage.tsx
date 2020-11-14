/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

export const ErrorMessage: React.FC = (props) => {
  return (
    <span
      css={css`
        color: #bf2600;
        font-weight: bold;
      `}
    >
      ERROR: {props.children}
    </span>
  );
};
