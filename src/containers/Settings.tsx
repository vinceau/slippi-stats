/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { ColorPicker } from "components/ColorPicker";
import { useParam } from "lib/hooks";
import { PortColor } from "lib/portColor";
import React from "react";
import { defaultTheme } from "styles/theme";

const Outer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  margin-top: -5rem;
  &.open {
    margin-top: -25%;
  }
  transition: all 0.2 ease-in-out;
`;

export const Settings: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useParam("primaryColor", defaultTheme.primaryColor);
  const [secondaryColor, setSecondaryColor] = useParam("secondaryColor", defaultTheme.secondaryColor);
  const [leftColor, setLeftColor] = useParam("leftColor", PortColor.P1);
  const [rightColor, setRightColor] = useParam("rightColor", PortColor.P2);
  //   const [color, setColor] = React.useState("#ffffff");
  const [open, setOpen] = React.useState(false);
  return (
    <Outer className={open ? "open" : ""}>
      <div
        onClick={() => setOpen(!open)}
        css={css`
          font-weight: bold;
        `}
      >
        {open ? "CLOSE SETTINGS" : "OPEN SETTINGS"}
      </div>
      <div>
        <div>Primary color</div>
        <ColorPicker value={primaryColor} onChange={setPrimaryColor} />
      </div>
      <div>
        <div>Secondary color</div>
        <ColorPicker value={secondaryColor} onChange={setSecondaryColor} />
      </div>
      <div>
        <div>Left color</div>
        <ColorPicker value={leftColor} onChange={setLeftColor} />
      </div>
      <div>
        <div>Right color</div>
        <ColorPicker value={rightColor} onChange={setRightColor} />
      </div>
    </Outer>
  );
};
