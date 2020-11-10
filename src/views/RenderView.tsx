/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import React from "react";
import { StatDisplay, StatDisplayProps } from "../components/StatDisplay";
import { useQuery } from "../lib/hooks";

import poweredByImage from "../styles/images/powered-by.png";

export const RenderView: React.FC = (props) => {
  const [key, setKey] = React.useState("");
  const [val, setVal] = React.useState("");
  const { paramMap, setQuery } = useQuery();

  const { mckm1, mckm2, mcno1, mcno2, opk1, opk2, tdd1, tdd2, dpo1, dpo2, ipm1, ipm2 } = paramMap;
  const statProps: StatDisplayProps = {
    mostCommonKillMove: { left: mckm1, right: mckm2 },
    mostCommonNeutralOpener: { left: mcno1, right: mcno2 },
    openingsPerKill: { left: opk1, right: opk2 },
    totalDamageDone: { left: tdd1, right: tdd2 },
    damagePerOpening: { left: dpo1, right: dpo2 },
    inputsPerMinute: { left: ipm1, right: ipm2 },
  };
  return (
    <div
      css={css`
        margin: 0 12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1
        css={css`
          text-transform: uppercase;
          font-weight: 800;
          font-size: 6rem;
          margin: 2rem;
        `}
      >
        Post Match Stats
      </h1>
      <img
        css={css`
          max-height: 5rem;
        `}
        src={poweredByImage}
      />
      <label>key</label>
      <input value={key} onChange={(e) => setKey(e.target.value)} />
      <label>val</label>
      <input value={val} onChange={(e) => setVal(e.target.value)} />
      <pre>{JSON.stringify(paramMap, null, 2)}</pre>
      <button onClick={() => setQuery(key, val)}>set</button>
      <StatDisplay {...statProps} />
    </div>
  );
};
