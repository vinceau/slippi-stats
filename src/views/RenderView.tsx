/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { ExternalLink as A } from "components/ExternalLink";
import { Header } from "components/Header";
import { Options } from "containers/Options";
import { useParam } from "lib/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { GlobalTheme } from "styles/theme";

import { RenderDisplay } from "../containers/RenderDisplay";
import poweredByImage from "../styles/images/powered-by.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    .settings {
      opacity: 1;
    }
  }
  .settings {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
`;

export interface RenderViewProps {
  showSlippiLogo?: boolean;
}

export const RenderView: React.FC<RenderViewProps> = ({ showSlippiLogo }) => {
  const [primaryColor] = useParam("primaryColor");
  const [secondaryColor] = useParam("secondaryColor");
  return (
    <div
      css={css`
        width: 1700px;
        height: 980px;
        margin: 0 auto;
      `}
    >
      <Container>
        <GlobalTheme primaryColor={primaryColor} secondaryColor={secondaryColor} />
        <Link to="/" title="Home">
          <Header>Post Match Stats</Header>
        </Link>
        <div
          css={css`
            margin-bottom: ${showSlippiLogo ? "2rem" : "4rem"};
            & > a {
              display: ${showSlippiLogo ? "block" : "none"};
            }
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
        <div className="settings">
          <Options />
        </div>
      </Container>
    </div>
  );
};
