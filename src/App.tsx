import React, { useState } from "react";
import { Row, Col, Slider } from "antd";
import "./App.css";
import PairInput from "./components/PairInput/PairInput";
import PairCard from "./components/PairCard/PairCard";
import { Button } from "antd";
import ParticlesBg from "particles-bg";
import logo from "./imgs/logo.png";

function App() {
  const [names, setNames] = useState<string[]>([]);

  const [pairs, setPairs] = useState<string[][]>([]);

  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const StringifyArray = (array: String[][]): string => {
    return `Pairs for ${new Date().toDateString()}: ${array
      .map((item) => `\n(${item.join(", ")})`)
      .join("")}`;
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
    <>
      <div className="App">
        <Col>
          <Row align="middle" justify="center" gutter={[8, 36]}>
            <Col>
              <img height="100" width="100" src={logo} />
            </Col>
            <Col>
              <span className="title-text">Pair Gen</span>
            </Col>
          </Row>
          <Row align="middle" justify="center" gutter={[8, 8]}>
            <PairInput
              names={names}
              onNewName={setNames}
              onEnter={generatePairs}
            />
            {pairs.length > 0 && (
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(StringifyArray(pairs));
                }}
              >
                Copy
              </Button>
            )}
          </Row>
          <Row align="middle" justify="center" gutter={[8, 8]}>
            <div className={"pair-card-container"}>
              {pairs.map((pair, index) => (
                <PairCard pair={pair} pairIndex={index} />
              ))}
            </div>
          </Row>
        </Col>
      </div>
      <ParticlesBg color="#63b89e" num={40} type="cobweb" bg={true} />
    </>
  );
}

export default App;
