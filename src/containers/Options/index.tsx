/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { characters as characterUtil } from "@slippi/slippi-js";
import styled from "@emotion/styled";
import { ExternalLink as A } from "components/ExternalLink";
import { OBSDragButton } from "components/OBSDragButton";
import { useOnClickOutside, useParam } from "lib/hooks";
import { PortColor } from "lib/portColor";
import React from "react";
import { defaultTheme } from "styles/theme";

import { DualColorPanel } from "./Panel";

const Content = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  display: block;
  position: absolute;
  width: 100%;
  top: 0;
  transform: translateY(-100%);
  background-color: inherit;
  margin: 0;
  text-align: center;
  padding: 1rem 0;
  font-size: 2rem;
  &::after {
    content: "";
    display: block;
    background-image: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
    height: 0.1rem;
    position: absolute;
    width: 80%;
    margin-left: 10%;
    bottom: 0;
  }
`;

const Outer = styled.div`
  position: fixed;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: black;
  opacity: 0.2;
  z-index: 10;
  &.closed:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &.open {
    opacity: 1;
    transform: translateY(-100%);
    .close-button {
      opacity: 1;
    }
  }
  transition: all 0.2s ease-in-out;
  .close-button {
    z-index: 10;
    position: absolute;
    right: 3rem;
    top: 1rem;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    color: black;
    background-color: white;
    padding: 0.2rem 1rem;
    font-weight: bold;
    font-size: 2.5rem;
    cursor: pointer;
    transform: translateY(-100%);
  }
`;

export const Options: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [char1] = useParam("char1");
  const [char2] = useParam("char2");

  const charName1 = characterUtil.getCharacterShortName(+char1);
  const charName2 = characterUtil.getCharacterShortName(+char2);
  const obsLayerName = `Slippi Stats - ${charName1} v ${charName2}`;

  const outerRef = React.useRef(null);

  useOnClickOutside(outerRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  const showOptions = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const closeOptions = () => setOpen(false);

  return (
    <Outer className={open ? "open" : "closed"} ref={outerRef} onClick={showOptions}>
      <div className="close-button" onClick={closeOptions}>
        ✕
      </div>
      <Heading>OPTIONS</Heading>
      <Content>
        <Column>
          <DualColorPanel
            panelLabel="PLAYER COLOR"
            leftLabel="LEFT"
            rightLabel="RIGHT"
            leftDefault={PortColor.P1}
            leftColorParam="leftColor"
            rightColorParam="rightColor"
            rightDefault={PortColor.P2}
          />
        </Column>
        <Column>
          <div
            css={css`
              margin-top: 1rem;
            `}
          >
            <OBSDragButton options={{ "layer-name": obsLayerName, "layer-width": 1920, "layer-height": 1080 }} />
          </div>
          <div
            css={css`
              font-size: 1.5rem;
              padding: 2rem 0;
              opacity: 0.5;
              transition: opacity 0.1s ease-in-out;
              &:hover {
                opacity: 1;
              }
              a:hover {
                text-decoration: underline;
              }
            `}
          >
            Made with love by <A href="https://twitter.com/_vinceau">Vince Au</A>
          </div>
        </Column>
        <Column>
          <DualColorPanel
            panelLabel="THEME COLOR"
            leftLabel="PRIMARY"
            rightLabel="SECONDARY"
            leftDefault={defaultTheme.primaryColor}
            leftColorParam="primaryColor"
            rightColorParam="secondaryColor"
            rightDefault={defaultTheme.secondaryColor}
          />
        </Column>
      </Content>
    </Outer>
  );
};
