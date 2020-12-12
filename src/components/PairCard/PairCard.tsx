import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import "./PairCard.css";
import {
  Draggable,
  Droppable
} from "react-beautiful-dnd";

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
      bordered={false}
      data-visible={1}
    >
      <Droppable key={pairIndex} droppableId={`${pairIndex}`} direction="horizontal">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className={"tag-container"}>
              {pair.map((person, index) => (
                <Draggable
                  index={index}
                  key={`${person}`}
                  draggableId={`${person}`}
                >
                  {(provided, snapshot) => (
                    <Tag
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      color="#56ca8d"
                    >
                      {person}
                    </Tag>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
}
export default PairCard;
