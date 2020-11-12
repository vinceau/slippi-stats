/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useParam } from "lib/hooks";
import { PortColor } from "lib/portColor";
import React from "react";

import { CharDisplay } from "./CharDisplay";
import { StatDisplay } from "./StatDisplay";

const Outer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

export const RenderDisplay: React.FC = () => {
  const [primaryColor] = useParam("primaryColor", "#286163");
  const [secondaryColor] = useParam("secondaryColor", "#121020");
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
      <StatDisplay
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        leftColor={leftColor}
        rightColor={rightColor}
      />
      <div
        css={css`
          width: 100%;
        `}
      >
        <CharDisplay theme={rightColor} charParam="char2" colorParam="color2" align="left" />
      </div>
      <Global
        styles={css`
          body.themed {
            background: radial-gradient(circle at center -30%, ${primaryColor}, ${secondaryColor});
          }
        `}
      />
    </Outer>
  );
};
