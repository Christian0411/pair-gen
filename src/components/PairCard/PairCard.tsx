import React  from "react";
import { Card } from "antd";
import "./PairCard.css";
import { Draggable, DraggableStateSnapshot, Droppable } from "react-beautiful-dnd";
import swap from "../../imgs/swap.png";

interface PairCardProps {
  pair: string[];
  pairIndex: number;
  highlightClassName: string;
  isDragging?: boolean;
}

function PairCard({
  pair,
  pairIndex,
  highlightClassName,
  isDragging,
}: PairCardProps) {
  const getItemStyle = (draggableStyle: any, snapshot: DraggableStateSnapshot) => {
    const style = {
      ...draggableStyle,

      // opt out of pointer-events: none for dragging items
      ...(snapshot.isDragging && { pointerEvents: "auto" }),
    };

    if (snapshot.isDropAnimating && snapshot.draggingOver === "add-new-card")
      return { ...style, transitionDuration: `0.001s` };

    if (snapshot.combineWith) {
      return { ...style, cursor: `url(${swap}), auto` };
    }
    return style;
  };

  return (
    <Card
      key={pairIndex}
      className={`card ${pair.length || "add-new-pair"}  ${highlightClassName}`}
      title={`Pair ${pairIndex}`}
      size={"small"}
      bordered={false}
      data-visible={isDragging ? 0 : 1}
    >
      <Droppable
        key={pairIndex}
        direction={"vertical"}
        droppableId={`${pairIndex}`}
        isCombineEnabled
      >
        {(provided, snapshot) => (
          <div
            className={"tag-container"}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {pair.map((person, index) => (
              <Draggable
                index={index}
                key={`${person}`}
                draggableId={`${person}`}
              >
                {(provided, snapshot) => (
                  <span
                    className={"tag"}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      provided.draggableProps.style,
                      snapshot
                    )}
                  >
                    {person}
                  </span>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
}

export default PairCard;
