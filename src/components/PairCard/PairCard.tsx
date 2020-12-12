import React from "react";
import { Card, Tag } from "antd";
import "./PairCard.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface PairCardProps {
  pair: string[];
  pairIndex: number;
}

function PairCard({ pair, pairIndex }: PairCardProps) {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId={`${pair}-${pairIndex}`}>
        {(provided) => (
          <div key={pairIndex} ref={provided.innerRef}>
            <Card
              key={pairIndex}
              className={"card"}
              title={`Pair ${pairIndex}`}
              bordered={false}
              data-visible={1}
            >
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
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        color="#56ca8d"
                      >
                        {person}
                      </Tag>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </Card>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default PairCard;
