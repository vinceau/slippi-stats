import { reorder } from "lib/util";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { StatOptionItem } from "./StatOptionItem";
import { StatOption } from "./types";

interface StatOptionListProps {
  value: StatOption[];
  onChange: (options: StatOption[]) => void;
}

export const StatOptionList: React.FC<StatOptionListProps> = (props) => {
  const statOptions = props.value;
  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const newArray = reorder(props.value, source.index, destination.index);
    props.onChange(newArray);
  };

  const toggle = (statId: string) => {
    const optionIndex = statOptions.findIndex((o) => o.statId === statId);
    if (optionIndex === -1) {
      return;
    }
    const newOptions = Array.from(statOptions);
    const option = newOptions[optionIndex];
    option.enabled = !option.enabled;
    props.onChange(newOptions);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="stat-option-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {statOptions.map((option, i) => {
              return (
                <StatOptionItem
                  key={option.statId}
                  index={i}
                  id={option.statId}
                  checked={option.enabled}
                  onChange={() => toggle(option.statId)}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
