import { useParam } from "lib/hooks";
import React from "react";

import { Stat } from "components/Stat";

export const DamagePerOpening: React.FC = () => {
  const [dpo1, setDpo1] = useParam("dpo1", "0");
  const [dpo2, setDpo2] = useParam("dpo2", "0");
  return (
    <Stat
      leftText={dpo1}
      onLeftTextBlur={(text) => setDpo1(text)}
      label="DAMAGE / OPENING"
      rightText={dpo2}
      onRightTextBlur={(text) => setDpo2(text)}
    />
  );
};
