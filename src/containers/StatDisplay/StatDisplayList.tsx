/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { reorder } from "lib/util";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { hasOpacity } from "styles/opacity";
import { Theme } from "styles/theme";
import { Divider } from "./Divider";
import { Statistic } from "./Statistic";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: "1rem 0",
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  //   display: "grid",
  //   gridTemplateColumns: "100%",
  //   rowGap: "2rem",
  marginTop: "-1rem",
  marginBottom: "-1rem",
});

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
            style={getListStyle(dropSnapshot.isDraggingOver)}
          >
            {items.map((item, index) => {
              const key = item ? item : "divider";
              return (
                <Draggable key={key} draggableId={key} index={index}>
                  {(dragProvided, dragSnapshot) => {
                    const additionalStyles = item ? null : dragProvided.dragHandleProps;
                    return (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...additionalStyles}
                        style={getItemStyle(dragSnapshot.isDragging, dragProvided.draggableProps.style)}
                      >
                        {item ? (
                          <div
                            css={css`
                              position: relative;
                              .remove {
                                display: none;
                              }
                              ${dropSnapshot.isDraggingOver
                                ? ""
                                : `&:hover {
                                .remove {
                                  display: block;
                                }
                              }
                              `}
                            `}
                          >
                            <Statistic statId={item} theme={theme} {...dragProvided.dragHandleProps} />
                            <div
                              className="remove"
                              css={css`
                                position: absolute;
                                top: 0;
                                left: 50%;
                                transform: translateX(-50%) translateY(-90%);
                                padding: 0.5rem 1.5rem;
                                color: black;
                                background-color: white;
                                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
                                font-weight: 600;
                                transition: all 0.2s ease-in-out;
                                cursor: pointer;
                                ${hasOpacity(0.4, 0.8)}
                              `}
                              onClick={() => onRemove(item)}
                            >
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
                      </div>
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
