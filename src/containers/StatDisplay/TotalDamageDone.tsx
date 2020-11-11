import { Stat } from "components/Stat";
import { useParam } from "lib/hooks";
import React from "react";

export const TotalDamageDone: React.FC = () => {
  const [tdd1, setTdd1] = useParam("tdd1", "0");
  const [tdd2, setTdd2] = useParam("tdd2", "0");
  return (
    <Stat
      leftText={tdd1}
      onLeftTextBlur={(text) => setTdd1(text)}
      label="TOTAL DAMAGE DONE"
      rightText={tdd2}
      onRightTextBlur={(text) => setTdd2(text)}
    />
  );
};
