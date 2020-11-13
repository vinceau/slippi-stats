/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Header } from "components/Header";
import { FileListInput } from "containers/FileListInput";
import { generateDemoQuery } from "lib/demo";
import React from "react";
import { useHistory } from "react-router-dom";
import { defaultTheme, GlobalTheme } from "styles/theme";

export const ButtonLink = styled.a`
  display: block;
  text-align: center;
  color: ${defaultTheme.secondaryColor};
  background: white;
  padding: 1rem 0rem;
  width: 100%;
  font-weight: 700;
  font-size: 2.3rem;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MainView: React.FC = () => {
  const history = useHistory();

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
          <Header>Slippi Stats</Header>
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
            padding-bottom: 2rem;
          `}
        >
          <ButtonLink onClick={onClick}>DEMO</ButtonLink>
          <ButtonLink>GITHUB</ButtonLink>
          <ButtonLink>AUTHOR</ButtonLink>
        </div>
      </Container>
    </div>
  );
};
