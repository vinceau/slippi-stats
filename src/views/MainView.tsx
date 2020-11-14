/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { ExternalLink as A } from "components/ExternalLink";
import { Header } from "components/Header";
import { FileListInput } from "containers/FileListInput";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext, Types } from "store";
import { defaultTheme, GlobalTheme } from "styles/theme";

const linkStyle = css`
  display: block;
  text-align: center;
  text-decoration: none;
  color: ${defaultTheme.secondaryColor};
  background: white;
  padding: 1rem 0rem;
  width: 100%;
  font-weight: 700;
  font-size: 2.3rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 2rem;
`;

export const MainView: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const primaryColor = localStorage.getItem("primaryColor") || defaultTheme.primaryColor;
  const secondaryColor = localStorage.getItem("secondaryColor") || defaultTheme.secondaryColor;

  const clearAll = () => {
    dispatch({
      type: Types.CLEAR_ALL,
    });
  };

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        max-width: 80rem;
        margin: 0 auto;
      `}
    >
      <GlobalTheme primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <Container>
        <div
          css={css`
            flex: none;
          `}
        >
          <Header
            onClick={clearAll}
            title="Refresh page"
            css={css`
              cursor: pointer;
              font-size: 4rem;
            `}
          >
            Slippi Stats
            <br />
            Graphic Generator
          </Header>
        </div>
        <div
          css={css`
            overflow-y: auto;
            flex: auto;
          `}
        >
          <FileListInput buttonColor={primaryColor} />
        </div>
        <div
          css={css`
            flex: none;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 1rem;
            padding: 2rem 0;
          `}
        >
          <Link css={linkStyle} to="/random" title="Show random sample stats">
            DEMO
          </Link>
          <A css={linkStyle} title="Fork this on Github" href="https://github.com/vinceau/slippi-stats">
            GITHUB
          </A>
          <A css={linkStyle} title="Send love" href="https://twitter.com/_vinceau">
            AUTHOR
          </A>
        </div>
      </Container>
    </div>
  );
};
