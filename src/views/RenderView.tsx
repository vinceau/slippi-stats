/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ExternalLink as A } from "components/ExternalLink";
import { Header } from "components/Header";
import { Options } from "containers/Options";
import { useParam } from "lib/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { GlobalTheme } from "styles/theme";

import { RenderDisplay } from "../containers/RenderDisplay";
import poweredByImage from "../styles/images/powered-by.png";

export const RenderView: React.FC = () => {
  const [primaryColor] = useParam("primaryColor");
  const [secondaryColor] = useParam("secondaryColor");
  return (
    <div
      css={css`
        padding: 0 12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        &:hover {
          .settings {
            opacity: 1;
          }
        }
      `}
    >
      <GlobalTheme primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <Link to="/" title="Home">
        <Header>Post Match Stats</Header>
      </Link>
      <div
        css={css`
          margin-bottom: 2rem;
        `}
      >
        <A href="https://slippi.gg">
          <img
            alt="Powered by Slippi"
            title="Open Slippi.gg homepage"
            src={poweredByImage}
            css={css`
              max-height: 5rem;
            `}
          />
        </A>
      </div>
      <RenderDisplay primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <div
        className="settings"
        css={css`
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
          position: absolute;
          left: 0;
          top: 100%;
          height: 100%;
          width: 100%;
          z-index: 10;
        `}
      >
        <Options />
      </div>
    </div>
  );
};
