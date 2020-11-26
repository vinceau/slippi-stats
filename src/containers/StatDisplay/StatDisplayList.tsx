import { reorder } from "lib/util";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = reorder(items, result.source.index, result.destination.index);

    // First update the local state
    setItems(newItems);
    // Then update the URL state
    setStats(newItems.join(","));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {items.map((item, index) => {
              const key = item ? item : "divider";
              return (
                <Draggable key={key} draggableId={key} index={index}>
                  {(provided, snapshot) => {
                    const additionalStyles = item ? null : provided.dragHandleProps;
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...additionalStyles}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {item ? <Statistic statId={item} theme={theme} {...provided.dragHandleProps} /> : <Divider />}
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
