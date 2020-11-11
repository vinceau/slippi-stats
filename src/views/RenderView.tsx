/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

import { RenderDisplay } from "../containers/RenderDisplay";
import poweredByImage from "../styles/images/powered-by.png";

const Header = styled.h1`
  text-transform: uppercase;
  font-weight: 800;
  font-size: 6rem;
  margin: 2rem;
  padding-bottom: 1.5rem;
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
      <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
        <Header>Post Match Stats</Header>
      </Link>
      <img
        alt="Powered by Slippi"
        css={css`
          max-height: 5rem;
          margin-bottom: 3rem;
        `}
        src={poweredByImage}
      />
      <RenderDisplay />
    </div>
  );
};
