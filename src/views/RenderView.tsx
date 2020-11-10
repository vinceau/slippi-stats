/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import React from "react";
import { useQuery } from "../lib/hooks";

import poweredByImage from "../styles/images/powered-by.png";

export const RenderView: React.FC = (props) => {
  const [key, setKey] = React.useState("");
  const [val, setVal] = React.useState("");
  const { paramMap, setQuery } = useQuery();
  return (
    <div
      css={css`
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
    </div>
  );
};
