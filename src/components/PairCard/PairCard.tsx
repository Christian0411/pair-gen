import React, { useState } from "react";
import { Card, Tag } from "antd";
import "./PairCard.css";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

interface PairCardProps {
  pair: string[];
  pairIndex: number;
}

function PairCard({ pair, pairIndex }: PairCardProps) {
  /// Drag/Drop Logic ///
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const [items, setItems] = useState<string[]>(pair);

  const onDragEnd = (result: DropResult) => {
    console.log(result)
    if (!result.destination) {
      return;
    }
  
    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
  
    setItems(newItems);
  }
  ///////////////////////

  return (
    /// Drag/Drop Logic /// 
    <DragDropContext onDragEnd={onDragEnd}>
      <Card
        key={pairIndex}
        className={"card"}
        title={`Pair ${pairIndex}`}
        bordered={false}
        data-visible={1}
      >
        <Droppable droppableId={`${pairIndex}`} direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className={"tag-container"}>
                {items.map((person, index) => (
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
    </DragDropContext>
    ///////////////////////
  );
}
export default PairCard;
