import { Stat } from "components/Stat";
import { useParam } from "lib/hooks";
import React from "react";

export const OpeningsPerKill: React.FC = () => {
  const [opk1, setOpk1] = useParam("opk1", "0");
  const [opk2, setOpk2] = useParam("opk2", "0");
  return (
    <Stat
      leftText={opk1}
      onLeftTextBlur={(text) => setOpk1(text)}
      label="OPENINGS / KILL"
      rightText={opk2}
      onRightTextBlur={(text) => setOpk2(text)}
    />
  );
};
