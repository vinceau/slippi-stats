/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

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
    </Outer>
  );
};
