/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

import { CharDisplay } from "./CharDisplay";
import { StatDisplay } from "./StatDisplay";

const Outer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

export const RenderDisplay: React.FC = (props) => {
  return (
    <Outer>
      <div
        css={css`
          justify-self: end;
          width: 100%;
        `}
      >
        <CharDisplay charParam="char1" colorParam="color1" align="right" />
      </div>
      <StatDisplay />
      <div
        css={css`
          width: 100%;
        `}
      >
        <CharDisplay charParam="char2" colorParam="color2" align="left" />
      </div>
    </Outer>
  );
};