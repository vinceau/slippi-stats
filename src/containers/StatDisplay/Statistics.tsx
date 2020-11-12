import { Stat } from "components/Stat";
import { useParam } from "lib/hooks";
import React from "react";

interface ThemeProps {
  primaryColor: string;
  secondaryColor: string;
}

interface ConnectedStatProps extends ThemeProps {
  param1: string;
  param2: string;
  label: string;
  type?: "text" | "number";
}

const ConnectedStat: React.FC<ConnectedStatProps> = (props) => {
  const { param1, param2, label, type, primaryColor, secondaryColor } = props;
  const defaultValue = type === "number" ? "0" : "-";
  const [field1, setField1] = useParam(param1, defaultValue);
  const [field2, setField2] = useParam(param2, defaultValue);
  const labelColor = type === "number" ? secondaryColor : "white";
  const labelBackground = type === "number" ? "white" : primaryColor;
  return (
    <Stat
      type={type}
      leftText={field1}
      onLeftTextBlur={(text) => setField1(text)}
      label={label}
      rightText={field2}
      onRightTextBlur={(text) => setField2(text)}
      labelColor={labelColor}
      labelBackground={labelBackground}
    />
  );
};

ConnectedStat.defaultProps = {
  type: "number",
};

export const MostCommonKillMove: React.FC<ThemeProps> = (props) => {
  return <ConnectedStat type="text" param1="mckm1" param2="mckm2" label="MOST COMMON KILL MOVE" {...props} />;
};

export const MostCommonNeutralOpener: React.FC<ThemeProps> = (props) => {
  return <ConnectedStat type="text" param1="mcno1" param2="mcno2" label="MOST COMMON NEUTRAL OPENER" {...props} />;
};

export const AverageKillPercent: React.FC<ThemeProps> = (props) => {
  return <ConnectedStat param1="akp1" param2="akp2" label="AVERAGE KILL PERCENT" {...props} />;
};

export const NeutralWins: React.FC<ThemeProps> = (props) => {
  return <ConnectedStat param1="nw1" param2="nw2" label="NEUTRAL WINS" {...props} />;
};

export const DamagePerOpening: React.FC<ThemeProps> = (props) => {
  return <ConnectedStat param1="dpo1" param2="dpo2" label="DAMAGE / OPENING" {...props} />;
};

export const InputsPerMinute: React.FC<ThemeProps> = (props) => {
  return <ConnectedStat param1="ipm1" param2="ipm2" label="INPUTS / MINUTE" {...props} />;
};

export const OpeningsPerKill: React.FC<ThemeProps> = (props) => {
  return <ConnectedStat param1="opk1" param2="opk2" label="OPENINGS / KILL" {...props} />;
};

export const TotalDamageDone: React.FC<ThemeProps> = (props) => {
  return <ConnectedStat param1="tdd1" param2="tdd2" label="TOTAL DAMAGE DONE" {...props} />;
};
