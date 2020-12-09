import React, { useState } from "react";
import { Card, Tag } from "antd";
import "./PairCard.css";

interface PairCardProps {
  pair: string[];
  pairIndex: number;
}

function PairCard({ pair, pairIndex }: PairCardProps) {
  console.log(pair);
  return (
    <Card title={`Pair ${pairIndex}`} bordered={false}>
      <div className={"tag-container"}>
        {pair.map((person) => (
          <Tag color="#63b89e">{person}</Tag>
        ))}
      </div>
    </Card>
  );
}
export default PairCard;
