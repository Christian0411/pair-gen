import React, { Component, useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import PairInput from "./components/PairInput/PairInput";
import PairCard from "./components/PairCard/PairCard";
import { Button } from "antd";

function App() {
  const [names, setNames] = useState<string[]>([]);

  const [pairs, setPairs] = useState<string[][]>([]);

  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const StringifyArray = (array: String[][]): string => {
    return `Pairs for ${new Date().toDateString}: ${array
      .map((item) => `(${item.join(", ")})`)
      .join(" | ")}`;
  };

  const generatePairs = (names: string[]) => {
    setNames([]);
    let temp = names;
    let tempPairs: string[][] = [];
    while (temp.length > 0) {
      let randomIndex = getRandomInt(0, temp.length);
      const name1 = temp[randomIndex];
      temp = temp.filter((item: string) => item !== name1);
      if (temp.length === 0) {
        tempPairs = [...tempPairs, [name1]];
        break;
      }
      randomIndex = getRandomInt(0, temp.length);
      const name2 = temp[randomIndex];
      temp = temp.filter((item: string) => item !== name2);
      tempPairs = [...tempPairs, [name1, name2]];
    }
    setPairs(tempPairs);
  };

  return (
    <div className="App">
      <div className="title-container">
        <h1 className="title-text">Pairs</h1>
      </div>
      <div className="pair-input-container">
        <PairInput names={names} onNewName={setNames} onEnter={generatePairs} />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(StringifyArray(pairs));
          }}
        >
          Copy
        </Button>
      </div>
      <div className={"pair-card-container"}>
        {pairs.map((pair, index) => (
          <PairCard pair={pair} pairIndex={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
