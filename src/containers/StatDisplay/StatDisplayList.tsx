/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { reorder } from "lib/util";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Theme } from "styles/theme";
import { Divider } from "./Divider";
import { StatDisplayItem } from "./StatDisplayItem";
import { Statistic } from "./Statistic";

interface StatDisplayListProps {
  theme: Theme;
  stats: string;
  setStats: (s: string) => void;
}

export const StatDisplayList: React.FC<StatDisplayListProps> = (props) => {
  const { theme, stats, setStats } = props;
  const [items, setItems] = React.useState<string[]>(stats.split(","));
  React.useEffect(() => {
    setItems(stats.split(","));
  }, [stats]);

  const updateStats = (statIds: string[]) => {
    // First update the local state
    setItems(statIds);
    // Then update the URL state
    setStats(statIds.join(","));
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = reorder(items, result.source.index, result.destination.index);
    updateStats(newItems);
  };

  const onRemove = (statId: string) => {
    const newItems = items.filter((s) => s !== statId);
    updateStats(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(dropProvided, dropSnapshot) => (
          <div
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
            css={css`
              margin: -1rem 0;
            `}
          >
            {items.map((item, index) => {
              const key = item ? item : "divider";
              return (
                <Draggable key={key} draggableId={key} index={index}>
                  {(dragProvided, dragSnapshot) => {
                    const additionalStyles = item ? null : dragProvided.dragHandleProps;
                    return (
                      <StatDisplayItem
                        ref={dragProvided.innerRef}
                        hasItem={Boolean(item)}
                        isDraggingOver={dropSnapshot.isDraggingOver}
                        {...dragProvided.draggableProps}
                        {...additionalStyles}
                        style={dragProvided.draggableProps.style}
                      >
                        {item ? (
                          <div
                            css={css`
                              position: relative;
                            `}
                          >
                            <Statistic statId={item} theme={theme} {...dragProvided.dragHandleProps} />
                            <div className="remove" onClick={() => onRemove(item)}>
                              ✕
                              <span
                                css={css`
                                  margin-left: 1rem;
                                `}
                              >
                                REMOVE
                              </span>
                            </div>
                          </div>
                        ) : (
                          <Divider />
                        )}
                      </StatDisplayItem>
                    );
                  }}
                </Draggable>
              );
            })}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
