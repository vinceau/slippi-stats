/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useParam } from "lib/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { defaultTheme, GlobalTheme } from "styles/theme";

import { RenderDisplay } from "../containers/RenderDisplay";
import poweredByImage from "../styles/images/powered-by.png";

const Header = styled.h1`
  text-transform: uppercase;
  font-weight: 800;
  font-size: 5.5rem;
  margin: 2rem;
  padding-bottom: 1rem;
  position: relative;

  &::before {
    z-index: -1;
    content: "";
    display: block;
    background-image: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
    height: 0.1rem;
    position: absolute;
    width: 80%;
    margin-left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
`;

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
      <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
        <Header>Post Match Stats</Header>
      </Link>
      <img
        alt="Powered by Slippi"
        css={css`
          max-height: 5rem;
          margin-bottom: 2rem;
        `}
        src={poweredByImage}
      />
      <RenderDisplay primaryColor={primaryColor} secondaryColor={secondaryColor} />
    </div>
  );
};
