import styled from "@emotion/styled";
import { STAT_DEFINITIONS } from "lib/stats";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Outer = styled.div<{
  checked?: boolean;
  isDragging?: boolean;
}>`
  opacity: ${(p) => (p.checked ? "1" : "0.5")};
  background-color: ${(p) => (p.isDragging ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.3)")};
  color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: ${(p) => (p.checked ? "600" : "100")};
  ${(p) =>
    p.isDragging
      ? `
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    opacity: 1;
`
      : ""}

  .title {
    cursor: pointer;
    margin-left: 1rem;
    user-select: none;
  }
  .handle {
    display: flex;
  }
`;

export const StatOptionItem: React.FC<{
  checked: boolean;
  index: number;
  id: string;
  onChange: (checked: boolean) => void;
}> = (props) => {
  const stat = (STAT_DEFINITIONS as any)[props.id];
  const toggle = () => props.onChange(!props.checked);
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <Outer
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          checked={props.checked}
        >
          <div>
            <input type="checkbox" checked={props.checked} onChange={toggle} />
            <span className="title" onClick={toggle}>
              {stat.name}
            </span>
          </div>
          <div className="handle" {...provided.dragHandleProps}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" fill="#ffffff" />
            </svg>
          </div>
        </Outer>
      )}
    </Draggable>
  );
};
