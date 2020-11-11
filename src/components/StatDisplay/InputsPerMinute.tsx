import React from "react";
import { useParam } from "../../lib/hooks/useParam";
import { Stat } from "./Stat";

export const InputsPerMinute: React.FC = () => {
  const [ipm1, setIpm1] = useParam("ipm1", "0");
  const [ipm2, setIpm2] = useParam("ipm2", "0");
  return (
    <Stat
      leftText={ipm1}
      onLeftTextBlur={(text) => setIpm1(text)}
      label="INPUTS / MINUTE"
      rightText={ipm2}
      onRightTextBlur={(text) => setIpm2(text)}
    />
  );
};
