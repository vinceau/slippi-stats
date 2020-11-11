import React from "react";

import styled from "@emotion/styled";
import { StatDisplay } from "./StatDisplay";

const Outer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

export const RenderDisplay: React.FC = (props) => {
  return (
    <Outer>
      <div>hi </div>
      <StatDisplay />
      <div>there</div>
    </Outer>
  );
};
