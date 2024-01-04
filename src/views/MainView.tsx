/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { ExternalLink as A } from "components/ExternalLink";
import { Header } from "components/Header";
import { FileListInput } from "containers/FileListInput";
import { languagePresenter, useLanguageStore } from "i18n/store";
import React from "react";
import { Link } from "react-router-dom";
import { hasOpacity } from "styles/opacity";
import { defaultTheme, GlobalTheme } from "styles/theme";

import { MainViewMessages as Messages } from "./MainView.messages";

const linkStyle = css`
  display: block;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  color: ${defaultTheme.secondaryColor};
  background: white;
  padding: 1rem 0rem;
  width: 100%;
  font-weight: 700;
  font-size: 2.3rem;
  cursor: pointer;
  ${hasOpacity(0.8)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 2rem;
`;

export const MainView: React.FC = () => {
  const languageIsLoading: boolean = useLanguageStore((store: any) => store.loading);
  const primaryColor = localStorage.getItem("primaryColor") || defaultTheme.primaryColor;
  const secondaryColor = localStorage.getItem("secondaryColor") || defaultTheme.secondaryColor;

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
          <button onClick={() => languagePresenter.setLanguage("en")} disabled={languageIsLoading}>
            {languageIsLoading ? "loading..." : "use en"}
          </button>
          <button onClick={() => languagePresenter.setLanguage("de")} disabled={languageIsLoading}>
            {languageIsLoading ? "loading..." : "use de"}
          </button>
          <h1>{(window as any).i18next.t("something")}</h1>
          <Header
            css={css`
              cursor: pointer;
              font-size: 4rem;
            `}
          >
            {Messages.slippiStats()}
            <br />
            {Messages.graphicGenerator()}
          </Header>
        </div>
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: auto;
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
          <Link css={linkStyle} to="/random" title={Messages.showSampleStats()}>
            {Messages.demo()}
          </Link>
          <A css={linkStyle} title={Messages.needHelp()} href="https://github.com/vinceau/slippi-stats#faq">
            {Messages.faq()}
          </A>
          <A css={linkStyle} title={Messages.sendLove()} href="https://twitter.com/_vinceau">
            {Messages.author()}
          </A>
        </div>
      </Container>
    </div>
  );
};
