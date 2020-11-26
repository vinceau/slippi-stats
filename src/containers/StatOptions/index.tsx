import React from "react";
import { StatOptionList } from "./StatOptionList";
import { StatOption } from "./types";

export * from "./types";

interface StatOptionsProps {
  onClose: () => void;
  value: StatOption[];
  onChange: (stats: StatOption[]) => void;
}

export const StatOptions: React.FC<StatOptionsProps> = (props) => {
  return (
    <div>
      <h1>custom stats list</h1>
      <StatOptionList value={props.value} onChange={props.onChange} />
      <div onClick={props.onClose}>close</div>
    </div>
  );
};
