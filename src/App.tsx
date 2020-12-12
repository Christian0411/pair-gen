import React, { useState } from "react";
import { Row, Col, Slider } from "antd";
import "./App.css";
import PairInput from "./components/PairInput/PairInput";
import PairCard from "./components/PairCard/PairCard";
import { Button } from "antd";
import ParticlesBg from "particles-bg";
import logo from "./imgs/logo.png";
import { CopyOutlined } from "@ant-design/icons";
import RollButton from "./components/RollButton/RollButton";

function App() {
  const [names, setNames] = useState<string[]>([]);

  const [pairs, setPairs] = useState<string[][]>([]);

  const [doRollAnimation, setDoRollAnimation] = useState<number>(0);

  const [hover, setHover] = useState<boolean>();

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
    setDoRollAnimation(1);
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
              onNewName={(names) => {
                setNames(names);
              }}
              onEnter={generatePairs}
            />
            <Col>
              <RollButton
                doAnimation={doRollAnimation}
                onClick={() => {
                  generatePairs(names);
                }}
                onRollAnimationEnd={() => {
                  setDoRollAnimation(0);
                }}
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" gutter={[16, 1]}>
            <div
              className={`pair-card-container ${
                hover ? "pair-card-container-hover" : ""
              }`}
            >
              {pairs.map((pair, index) => (
                <PairCard pair={pair} pairIndex={index} />
              ))}
            </div>
          </Row>
          <Row align="middle" justify="center">
            <div className={"copy-container"}>
              {pairs.length > 0 && (
                <Button
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(StringifyArray(pairs));
                  }}
                  style={{ background: "transparent", border: 0 }}
                >
                  <CopyOutlined className="copy-icon" />
                </Button>
              )}
            </div>
          </Row>
        </Col>
      </div>
      <ParticlesBg color="#56ca8d" num={40} type="cobweb" bg={true} />
    </>
  );
}

export default App;
