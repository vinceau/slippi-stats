import { Stat } from "components/Stat";
import { useParam } from "lib/hooks";
import React from "react";

interface ConnectedStatProps {
  param1: string;
  param2: string;
  label: string;
  type?: "text" | "number";
}

const ConnectedStat: React.FC<ConnectedStatProps> = (props) => {
  const { param1, param2, label, type } = props;
  const [field1, setField1] = useParam(param1);
  const [field2, setField2] = useParam(param2);
  return (
    <Stat
      type={type}
      leftText={field1}
      onLeftTextBlur={(text) => setField1(text)}
      label={label}
      rightText={field2}
      onRightTextBlur={(text) => setField2(text)}
    />
  );
};

export const MostCommonKillMove: React.FC = () => {
  return <ConnectedStat type="text" param1="mckm1" param2="mckm2" label="MOST COMMON KILL MOVE" />;
};

export const MostCommonNeutralOpener: React.FC = () => {
  return <ConnectedStat type="text" param1="mcno1" param2="mcno2" label="MOST COMMON NEUTRAL OPENER" />;
};

export const AverageKillPercent: React.FC = () => {
  return <ConnectedStat param1="akp1" param2="akp2" label="AVERAGE KILL PERCENT" />;
};

export const NeutralWins: React.FC = () => {
  return <ConnectedStat param1="nw1" param2="nw2" label="NEUTRAL WINS" />;
};

export const DamagePerOpening: React.FC = () => {
  return <ConnectedStat param1="dpo1" param2="dpo2" label="DAMAGE / OPENING" />;
};

export const InputsPerMinute: React.FC = () => {
  return <ConnectedStat param1="ipm1" param2="ipm2" label="INPUTS / MINUTE" />;
};

export const OpeningsPerKill: React.FC = () => {
  return <ConnectedStat param1="opk1" param2="opk2" label="OPENINGS / KILL" />;
};

export const TotalDamageDone: React.FC = () => {
  return <ConnectedStat param1="tdd1" param2="tdd2" label="TOTAL DAMAGE DONE" />;
};
