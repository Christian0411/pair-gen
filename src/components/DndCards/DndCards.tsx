import React, { useEffect, useState } from "react";
import PairCard from "../PairCard/PairCard";
import { DragDropContext } from "react-beautiful-dnd";

interface DndCardsProps {
  pairs: string[][];
  onPairChange: (newPairs: string[][]) => void;
}

function DndCards({ pairs, onPairChange }: DndCardsProps) {
  const [dndPairs, setDndPairs] = useState<string[][]>(pairs);

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
    } else {
      const result = move(dndPairs[sInd], dndPairs[dInd], source, destination);
      const newPairs = [...dndPairs];
      newPairs[sInd] = result[sInd];
      newPairs[dInd] = result[dInd];

      setDndPairs(newPairs.filter((group) => group.length));
    }
  };

  function onDragEnd(result: any) {
    const { source, destination } = result;

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

      const swappeeDestination = swapperSource;
      const newPairs = swap(
        dndPairs[swapperSource.droppableId],
        dndPairs[swapperDestination.droppableId],
        swapperSource,
        swapperDestination
      );
      console.log(newPairs);
      setDndPairs([newPairs[0], newPairs[1]]);
    } else {
      moveAndUpdatePairs(source, destination);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {dndPairs.map((pair, index) => (
        <PairCard key={index} pair={pair} pairIndex={index} />
      ))}
    </DragDropContext>
  );
}
export default DndCards;
