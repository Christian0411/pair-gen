import React, { useEffect, useState } from "react";
import PairCard from "../PairCard/PairCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./DndCards.css";
import { PlusOutlined } from "@ant-design/icons";
interface DndCardsProps {
  pairs: string[][];
  onPairChange: (newPairs: string[][]) => void;
  highlightClassName: string;
}

function DndCards({ pairs, onPairChange, highlightClassName }: DndCardsProps) {
  const [dndPairs, setDndPairs] = useState<string[][]>(pairs);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    onPairChange(dndPairs);
  }, [dndPairs]);

  useEffect(() => {
    if (JSON.stringify(dndPairs) !== JSON.stringify(pairs)) {
      setDndPairs(pairs);
    }
  }, [pairs]);

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  const swap = (
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const [removedDes] = destClone.splice(
      droppableDestination.index,
      1,
      removed
    );

    sourceClone.splice(droppableSource.index, 0, removedDes);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const moveAndUpdatePairs = (source: any, destination: any) => {
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(dndPairs[sInd], source.index, destination.index);
      const newPairs: any = [...dndPairs];
      newPairs[sInd] = items;
      setDndPairs(newPairs);
    } else if (destination.droppableId > dndPairs.length-1) {
      // addNewCardLogicHere
      let newPairs = dndPairs;
      const temp = newPairs[source.droppableId].splice(source.index, 1);
      newPairs = newPairs.concat([temp])
      console.log(newPairs)
      setDndPairs(newPairs)
    }
    else {
      const result = move(dndPairs[sInd], dndPairs[dInd], source, destination);
      const newPairs = [...dndPairs];
      newPairs[sInd] = result[sInd];
      newPairs[dInd] = result[dInd];

      setDndPairs(newPairs.filter((group) => group.length));
    }
  };

  function onDragEnd(result: any) {
    const { source, destination } = result;

    if (destination.droppableId === "add-new-card"){
      // addNewCardLogicHere
      destination.droppableId = dndPairs.length.toString()
      moveAndUpdatePairs(source, destination);
    }

    if (result.combine) {
      const swappeeIndex = dndPairs[result.combine.droppableId].findIndex(
        (tag) => tag === result.combine.draggableId
      );
      const swappeeSource = {
        droppableId: result.combine.droppableId,
        index: swappeeIndex,
      };

      const swapperSource = source;
      const swapperDestination = swappeeSource;

      if (swapperSource.droppableId === swapperDestination.droppableId) return;
      const swapResult = swap(
        dndPairs[swapperSource.droppableId],
        dndPairs[swapperDestination.droppableId],
        swapperSource,
        swapperDestination
      );
      const newPairs = [...dndPairs];

      newPairs[source.droppableId] = swapResult[source.droppableId];
      newPairs[swapperDestination.droppableId] =
        swapResult[swapperDestination.droppableId];
      setDndPairs([...newPairs]);
    } else {
      moveAndUpdatePairs(source, destination);
    }
  }

  const onBeforeCapture = () => {
    setDndPairs([...dndPairs]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
      {dndPairs.map((pair, index) => (
        <PairCard
          highlightClassName={highlightClassName}
          key={index}
          pair={pair}
          pairIndex={index}
        />
      ))}
      <Droppable
        key={"add-new-card"}
        direction={"vertical"}
        droppableId={`add-new-card`}
        isCombineEnabled
      >
        {(provided, snapshot) => (
          <div
            className="add-new-card-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <PlusOutlined className="add-new-card" />
            <span
              style={{
                display: "none",
              }}
            >
              {provided.placeholder}
            </span>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default DndCards;
