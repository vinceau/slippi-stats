import React from "react";

import { useParam } from "../../lib/hooks/useParam";
import { Stat } from "./Stat";

export const MostCommonNeutralOpener: React.FC = () => {
  const [mcno1, setMcno1] = useParam("mcno1", "0");
  const [mcno2, setMcno2] = useParam("mcno2", "0");
  return (
    <Stat
      leftText={mcno1}
      onLeftTextBlur={(text) => setMcno1(text)}
      label="MOST COMMON NEUTRAL OPENER"
      rightText={mcno2}
      onRightTextBlur={(text) => setMcno2(text)}
    />
  );
};
