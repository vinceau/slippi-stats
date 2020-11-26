import styled from "@emotion/styled";
import { Stat, STAT_DEFINITIONS } from "lib/stats";
import { reorder } from "lib/util";
import React from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

export type StatOptions = Array<{
  statId: string;
  enabled: boolean;
}>;

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

interface CustomStatsListProps {
  onClose: () => void;
  value: StatOptions;
  onChange: (options: StatOptions) => void;
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

const StatItem: React.FC<{ checked: boolean; index: number; id: string; onChange: (checked: boolean) => void }> = (
  props
) => {
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

const generateStatOptions = (current: StatOptions): StatOptions => {
  // Since we're persisting user options in localStorage, we need to be able to
  // handle the case where new options are available, yet not in their localStorage.
  const newItems: StatOptions = ALL_STATS_LIST.filter(
    (statId) => !current.find((option) => option.statId === statId)
  ).map((statId) => ({ statId, enabled: false }));

  // Make sure the ones we're showing are supported
  const currentItems = current.filter((c) => ALL_STATS_LIST.includes(c.statId));
  return [...currentItems, ...newItems];
};

export const CustomStatsList: React.FC<CustomStatsListProps> = (props) => {
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
    <div>
      <h1>custom stats list</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"droppable-stats-list"}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {statOptions.map((option, i) => {
                return (
                  <StatItem
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
      <div onClick={props.onClose}>close</div>
    </div>
  );
};
