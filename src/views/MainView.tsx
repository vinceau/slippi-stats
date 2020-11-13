/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Header } from "components/Header";
import { FileListInput } from "containers/FileListInput";
import { generateDemoQuery } from "lib/demo";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext, Types } from "store";
import { defaultTheme, GlobalTheme } from "styles/theme";

export const ButtonLink = styled.a`
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
`;

export const MainView: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  const clearAll = () => {
    dispatch({
      type: Types.CLEAR_ALL,
    });
  };

  const onClick = () => {
    const paramMap = generateDemoQuery();
    const search = "?" + new URLSearchParams(paramMap).toString();
    history.push({
      pathname: "/render",
      search,
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
      <GlobalTheme {...defaultTheme} />
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
            `}
          >
            Slippi Stats
          </Header>
        </div>
        <div
          css={css`
            overflow-y: auto;
            flex: auto;
          `}
        >
          <FileListInput />
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
          <ButtonLink onClick={onClick} title="Show random sample stats">
            DEMO
          </ButtonLink>
          <ButtonLink
            title="Fork this on Github"
            href="https://github.com/vinceau/slippi-stats"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </ButtonLink>
          <ButtonLink title="Send love" href="https://twitter.com/_vinceau" target="_blank" rel="noopener noreferrer">
            AUTHOR
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
};
