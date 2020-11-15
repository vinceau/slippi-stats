/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useParam } from "lib/hooks";
import { PortColor } from "lib/portColor";
import React from "react";
import { Theme } from "styles/theme";

import { CharDisplay } from "./CharDisplay";
import { NameBlock } from "./NameBlock";
import { ScoreBlock } from "./ScoreBlock";
import { StatDisplay } from "./StatDisplay";

const Outer = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

const NameBlockContainer = styled.div<{
  align: "left" | "right";
}>`
  ${(p) => `
  width: 20%;
  position: absolute;
  ${p.align}: 0;
  margin-${p.align}: 2rem;
  bottom: 15%;
  `}
`;

export const RenderDisplay: React.FC<Theme> = (theme) => {
  const [leftColor] = useParam("leftColor", PortColor.P1);
  const [rightColor] = useParam("rightColor", PortColor.P2);
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
      <StatDisplay leftColor={leftColor} rightColor={rightColor} {...theme} />
      <div
        css={css`
          width: 100%;
        `}
      >
        <CharDisplay theme={rightColor} charParam="char2" colorParam="color2" align="left" />
      </div>
      <NameBlockContainer align="left">
        <NameBlock nameParam="name1" subtitleParam="sub1" {...theme} />
      </NameBlockContainer>
      <NameBlockContainer align="right">
        <NameBlock nameParam="name2" subtitleParam="sub2" {...theme} />
      </NameBlockContainer>
      <div
        css={css`
          position: absolute;
          bottom: -6rem;
          width: 100%;
          display: flex;
          justify-content: center;
        `}
      >
        <ScoreBlock primaryColor={theme.primaryColor} />
      </div>
    </Outer>
  );
};
