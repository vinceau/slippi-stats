import styled from "@emotion/styled";
import { STAT_DEFINITIONS } from "lib/stats";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Outer = styled.div<{
  isDragging: boolean;
}>`
  ${(p) =>
    p.isDragging
      ? `
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`
      : ""}
`;

export const StatOptionItem: React.FC<{
  checked: boolean;
  index: number;
  id: string;
  onChange: (checked: boolean) => void;
}> = (props) => {
  const stat = (STAT_DEFINITIONS as any)[props.id];
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <Outer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>
            <input type="checkbox" checked={props.checked} onChange={() => props.onChange(!props.checked)} />
            {stat.name}
          </div>
        </Outer>
      )}
    </Draggable>
  );
};
