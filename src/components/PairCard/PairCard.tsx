import React, { useState, useEffect } from "react";
import { Card, Tag } from "antd";
import "./PairCard.css";
import Draggable from "react-draggable";

interface PairCardProps {
  pair: string[];
  pairIndex: number;
}

function PairCard({ pair, pairIndex }: PairCardProps) {
  return (
    <Card
      className={"card"}
      title={`Pair ${pairIndex}`}
      bordered={false}
      data-visible={1}
    >
      <div className={"tag-container"}>
        {pair.map((person) => (
          <Draggable>
            <Tag color="#56ca8d">{person}</Tag>
          </Draggable>
        ))}
      </div>
    </Card>
  );
}
export default PairCard;
