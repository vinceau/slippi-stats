import { STAT_DEFINITIONS } from "lib/stats";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { Option } from "./Option";

export const StatOptionItem: React.FC<{
  checked: boolean;
  index: number;
  id: string;
  onChange: (checked: boolean) => void;
}> = (props) => {
  const stat = STAT_DEFINITIONS.get(props.id);
  if (!stat) {
    return null;
  }
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          <Option
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
            checked={props.checked}
            onChange={props.onChange}
            draggable={true}
            name={stat.name}
            handleProps={provided.dragHandleProps}
          />
        </div>
      )}
    </Draggable>
  );
};
