import React from "react";
import { Card, Tag } from "antd";
import "./PairCard.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import swap from "../../imgs/swap.png";

interface PairCardProps {
  pair: string[];
  pairIndex: number;
  highlightClassName: string;
}

function PairCard({ pair, pairIndex, highlightClassName }: PairCardProps) {
  const getItemStyle = (draggableStyle: any, snapshot: any) => {
    const style = {
      ...draggableStyle,

      // opt out of pointer-events: none for dragging items
      ...(snapshot.isDragging && { pointerEvents: "auto" }),
    };

    if (snapshot.combineWith) {
      return { ...style, cursor: `url(${swap}), auto` };
    }
    return style;
  };

  return (
    <Card
      key={pairIndex}
      className={`card ${highlightClassName}`}
      title={`Pair ${pairIndex}`}
      size={"small"}
      bordered={false}
      data-visible={1}
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
