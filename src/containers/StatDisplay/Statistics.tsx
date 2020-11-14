import { InlineEdit } from "components/InlineEdit";
import { TextStat, NumberStat } from "components/Stat";
import { useParam } from "lib/hooks";
import React from "react";
import { Theme } from "styles/theme";

interface ConnectedStatProps {
  param1: string;
  param2: string;
  label: string;
}

const ConnectedNumberStat: React.FC<ConnectedStatProps> = (props) => {
  const { param1, param2, label } = props;
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
    />
  );
};

const ConnectedTextStat: React.FC<ConnectedStatProps & Theme> = (props) => {
  const { param1, param2, label, primaryColor } = props;
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
    />
  );
};

export const MostCommonKillMove: React.FC<Theme> = (props) => {
  return <ConnectedTextStat param1="mckm1" param2="mckm2" label="MOST COMMON KILL MOVE" {...props} />;
};

export const MostCommonNeutralOpener: React.FC<Theme> = (props) => {
  return <ConnectedTextStat param1="mcno1" param2="mcno2" label="MOST COMMON NEUTRAL OPENER" {...props} />;
};

export const AverageKillPercent: React.FC = () => {
  return <ConnectedNumberStat param1="akp1" param2="akp2" label="AVERAGE KILL PERCENT" />;
};

export const NeutralWins: React.FC = () => {
  return <ConnectedNumberStat param1="nw1" param2="nw2" label="NEUTRAL WINS" />;
};

export const DamagePerOpening: React.FC = () => {
  return <ConnectedNumberStat param1="dpo1" param2="dpo2" label="DAMAGE / OPENING" />;
};

export const InputsPerMinute: React.FC = () => {
  return <ConnectedNumberStat param1="ipm1" param2="ipm2" label="INPUTS / MINUTE" />;
};

export const OpeningsPerKill: React.FC = () => {
  return <ConnectedNumberStat param1="opk1" param2="opk2" label="OPENINGS / KILL" />;
};

export const TotalDamageDone: React.FC = () => {
  return <ConnectedNumberStat param1="tdd1" param2="tdd2" label="TOTAL DAMAGE DONE" />;
};
