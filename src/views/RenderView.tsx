/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

import { StatDisplay } from "../components/StatDisplay";
import poweredByImage from "../styles/images/powered-by.png";

export const RenderView: React.FC = (props) => {
  return (
    <div
      css={css`
        margin: 0 12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1
        css={css`
          text-transform: uppercase;
          font-weight: 800;
          font-size: 6rem;
          margin: 2rem;
        `}
      >
        Post Match Stats
      </h1>
      <img
        css={css`
          max-height: 5rem;
        `}
        src={poweredByImage}
      />
      <StatDisplay />
    </div>
  );
};
