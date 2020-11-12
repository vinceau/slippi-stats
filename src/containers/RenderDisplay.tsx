/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { TextBlock } from "components/TextBlock";
import { useParam } from "lib/hooks";
import { PortColor } from "lib/portColor";
import React from "react";
import { Theme } from "styles/theme";

import { CharDisplay } from "./CharDisplay";
import { StatDisplay } from "./StatDisplay";

const Outer = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

const NameBlock = styled.div`
  width: 20%;
`;

const Name = styled.div`
  font-size: 150%;
  font-weight: 800;
`;

const Subtitle = styled.div<{
  show?: boolean;
}>`
  margin-top: -0.3rem;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  ${(p) =>
    p.show
      ? "opacity: 1;"
      : `&:hover {
                  opacity: 1
                }`}
`;

export const RenderDisplay: React.FC<Theme> = ({ primaryColor, secondaryColor }) => {
  const [leftColor] = useParam("leftColor", PortColor.P1);
  const [rightColor] = useParam("rightColor", PortColor.P2);
  const [name1, setName1] = useParam("name1", "HELLO");
  const [name2, setName2] = useParam("name2", "WORLD");
  const [sub1, setSub1] = useParam("sub1", "");
  const [sub2, setSub2] = useParam("sub2", "");
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
      <div
        css={css`
          position: absolute;
          bottom: 15%;
          display: inline-flex;
          width: 98%;
          margin: 0 1%;
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <NameBlock>
            <Name>
              <TextBlock value={name1} onEdit={setName1} color="white" backgroundColor={primaryColor} />
            </Name>
            <Subtitle show={Boolean(sub1)}>
              <TextBlock value={sub1} onEdit={setSub1} color={secondaryColor} backgroundColor="white" />
            </Subtitle>
          </NameBlock>
          <NameBlock>
            <Name>
              <TextBlock value={name2} onEdit={setName2} color="white" backgroundColor={primaryColor} />
            </Name>
            <Subtitle show={Boolean(sub2)}>
              <TextBlock value={sub2} onEdit={setSub2} color={secondaryColor} backgroundColor="white" />
            </Subtitle>
          </NameBlock>
        </div>
      </div>
    </Outer>
  );
};
