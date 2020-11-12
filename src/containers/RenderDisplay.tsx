/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useParam } from "lib/hooks";
import React from "react";

import { CharDisplay } from "./CharDisplay";
import { StatDisplay } from "./StatDisplay";

const Outer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

export const RenderDisplay: React.FC = (props) => {
  const [leftColor] = useParam("leftColor", "#f52e2e");
  const [rightColor] = useParam("rightColor", "#5463ff");
  return (
    <Outer>
      <div
        css={css`
          justify-self: end;
          width: 100%;
        `}
      >
        <CharDisplay theme={leftColor} charParam="char1" colorParam="color1" align="right" />
      </div>
      <StatDisplay leftColor={leftColor} rightColor={rightColor} />
      <div
        css={css`
          width: 100%;
        `}
      >
        <CharDisplay theme={rightColor} charParam="char2" colorParam="color2" align="left" />
      </div>
    </Outer>
  );
};
