import { InlineEdit } from "components/InlineEdit";
import { NumberStat, TextStat } from "components/Stat";
import { useParam } from "lib/hooks";
import { STAT_DEFINITIONS } from "lib/stats";
import React from "react";
import { Theme } from "styles/theme";

interface ConnectedStatProps {
  param1: string;
  param2: string;
  label: string;
}

const ConnectedNumberStat: React.FC<ConnectedStatProps & Record<string, any>> = (props) => {
  const { param1, param2, label, children, ...rest } = props;
  const defaultValue = "0";
  const [field1, setField1] = useParam(param1, defaultValue);
  const [field2, setField2] = useParam(param2, defaultValue);
  return (
    <NumberStat
      label={label}
      color="black"
      backgroundColor="white"
      leftComponent={<InlineEdit text={field1} onSetText={setField1} />}
      rightComponent={<InlineEdit text={field2} textAlign="right" onSetText={setField2} />}
      {...rest}
    />
  );
};

const ConnectedTextStat: React.FC<ConnectedStatProps & Theme & Record<string, any>> = (props) => {
  const { param1, param2, label, primaryColor, children, ...rest } = props;
  const defaultValue = "-";
  const [field1, setField1] = useParam(param1, defaultValue);
  const [field2, setField2] = useParam(param2, defaultValue);
  return (
    <TextStat
      label={label}
      color="white"
      backgroundColor={primaryColor}
      leftComponent={<InlineEdit text={field1} onSetText={setField1} />}
      rightComponent={<InlineEdit text={field2} textAlign="right" onSetText={setField2} />}
      {...rest}
    />
  );
};

export const Statistic: React.FC<
  {
    theme: Theme;
    statId: string;
  } & Record<string, any>
> = (props) => {
  const { statId, theme, children, ...rest } = props;
  const statInfo = (STAT_DEFINITIONS as any)[statId];
  if (!statInfo) {
    return null;
  }

  const { name, type } = statInfo;
  const label = (name as string).toUpperCase();
  if (type === "number") {
    return <ConnectedNumberStat param1={`${statId}1`} param2={`${statId}2`} label={label} {...rest} />;
  } else if (type === "text") {
    return <ConnectedTextStat param1={`${statId}1`} param2={`${statId}2`} label={label} {...theme} {...rest} />;
  }

  return null;
};
