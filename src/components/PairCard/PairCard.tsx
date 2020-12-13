import React from "react";
import { Card, Tag } from "antd";
import "./PairCard.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface PairCardProps {
  pair: string[];
  pairIndex: number;
}

function PairCard({ pair, pairIndex }: PairCardProps) {
  return (
    <Card
      key={pairIndex}
      className={"card"}
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
                    className="tag"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
