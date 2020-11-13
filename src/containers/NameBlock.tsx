/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useParam } from "lib/hooks";
import React from "react";

import { TextBlock } from "../components/TextBlock";

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
  font-weight: 600;
`;

export interface NameBlockProps {
  nameParam: string;
  defaultName: string;
  subtitleParam: string;
  primaryColor: string;
  secondaryColor: string;
}

export const NameBlock: React.FC<NameBlockProps> = ({
  nameParam,
  defaultName,
  subtitleParam,
  primaryColor,
  secondaryColor,
}) => {
  const [name, setName] = useParam(nameParam, defaultName);
  const [sub, setSub] = useParam(subtitleParam);
  return (
    <div>
      <Name>
        <TextBlock value={name} onEdit={setName} color="white" backgroundColor={primaryColor} />
      </Name>
      <Subtitle>
        <TextBlock value={sub} optional={true} onEdit={setSub} color={secondaryColor} backgroundColor="white" />
      </Subtitle>
    </div>
  );
};
