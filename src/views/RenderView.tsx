/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Header } from "components/Header";
import { useParam } from "lib/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { defaultTheme, GlobalTheme } from "styles/theme";

import { RenderDisplay } from "../containers/RenderDisplay";
import poweredByImage from "../styles/images/powered-by.png";

export const RenderView: React.FC = () => {
  const [primaryColor] = useParam("primaryColor", defaultTheme.primaryColor);
  const [secondaryColor] = useParam("secondaryColor", defaultTheme.secondaryColor);
  return (
    <div
      css={css`
        margin: 0 12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <GlobalTheme primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }} title="Back to homepage">
        <Header>Post Match Stats</Header>
      </Link>
      <div
        css={css`
          margin-bottom: 2rem;
        `}
      >
        <a href="https://slippi.gg" target="_blank" rel="noopener noreferrer">
          <img
            alt="Powered by Slippi"
            title="Open Slippi.gg homepage"
            src={poweredByImage}
            css={css`
              max-height: 5rem;
            `}
          />
        </a>
      </div>
      <RenderDisplay primaryColor={primaryColor} secondaryColor={secondaryColor} />
    </div>
  );
};
