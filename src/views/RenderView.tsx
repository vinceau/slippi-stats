import React from "react";
import { useQuery } from "../lib/hooks";

export const RenderView: React.FC = (props) => {
  const [key, setKey] = React.useState("");
  const [val, setVal] = React.useState("");
  const { paramMap, setQuery } = useQuery();
  return (
    <div>
      <h3>hello world</h3>
      <label>key</label>
      <input value={key} onChange={(e) => setKey(e.target.value)} />
      <label>val</label>
      <input value={val} onChange={(e) => setVal(e.target.value)} />
      <pre>{JSON.stringify(paramMap, null, 2)}</pre>
      <button onClick={() => setQuery(key, val)}>set</button>
    </div>
  );
};
