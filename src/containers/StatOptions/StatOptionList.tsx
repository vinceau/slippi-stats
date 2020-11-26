import styled from "@emotion/styled";
import { Stat, STAT_DEFINITIONS } from "lib/stats";
import { reorder } from "lib/util";
import React from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { StatOptionItem } from "./StatOptionItem";
import { StatOption } from "./types";

const ALL_STATS_LIST: string[] = [
  Stat.INPUTS_PER_MINUTE,
  Stat.DAMAGE_PER_OPENING,
  Stat.OPENINGS_PER_KILL,
  Stat.DAMAGE_DONE,
  Stat.AVG_KILL_PERCENT,
  Stat.NEUTRAL_WINS,
  Stat.L_CANCEL,
  Stat.FIRST_BLOOD,
];

interface StatOptionListProps {
  value: StatOption[];
  onChange: (options: StatOption[]) => void;
}

const generateStatOptions = (current: StatOption[]): StatOption[] => {
  // Since we're persisting user options in localStorage, we need to be able to
  // handle the case where new options are available, yet not in their localStorage.
  const newItems: StatOption[] = ALL_STATS_LIST.filter(
    (statId) => !current.find((option) => option.statId === statId)
  ).map((statId) => ({ statId, enabled: false }));

  // Make sure the ones we're showing are supported
  const currentItems = current.filter((c) => ALL_STATS_LIST.includes(c.statId));
  return [...currentItems, ...newItems];
};

export const StatOptionList: React.FC<StatOptionListProps> = (props) => {
  const statOptions = generateStatOptions(props.value);
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
