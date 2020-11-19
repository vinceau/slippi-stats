import styled from "@emotion/styled";
import { moveArrayItem } from "lib/util";
import React from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

interface CustomStatsListProps {
  onClose: () => void;
  value: string[];
  onChange: (options: string[]) => void;
}

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

const StatItem: React.FC<{ index: number; id: string }> = (props) => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <Outer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>{props.id}</div>
        </Outer>
      )}
    </Draggable>
  );
};

export const CustomStatsList: React.FC<CustomStatsListProps> = (props) => {
  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const newArray = moveArrayItem(props.value, source.index, destination.index);
    props.onChange(newArray);
  };
  return (
    <div>
      <h1>custom stats list</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"droppable-stats-list"}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.value.map((statId, i) => {
                const key = statId ? statId : `divider-${i}`;
                return <StatItem key={key} index={i} id={key} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div onClick={props.onClose}>close</div>
    </div>
  );
};
