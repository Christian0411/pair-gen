import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Tooltip } from "antd";
import "./App.css";
import PairInput from "./components/PairInput/PairInput";
import { Button } from "antd";
import ParticlesBg from "particles-bg";
import logo from "./imgs/logo.png";
import { CopyOutlined, GithubOutlined } from "@ant-design/icons";
import RollButton from "./components/RollButton/RollButton";
import DndCards from "./components/DndCards/DndCards";

function App() {
  const [names, setNames] = useState<string[]>([]);

  const [pairs, setPairs] = useState<string[][]>([]);

  const [doRollAnimation, setDoRollAnimation] = useState<number>(0);

  const [hover, setHover] = useState<boolean>();

  const [tooltipVisible, setTooltipVisible] = useState<boolean>();

  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const createCopyString = (array: String[][]): string => {
    return `Pairs for ${new Date().toDateString()}: ${array
      .map((item) => `\n(${item.join(", ")})`)
      .join("")}\nGenerated using ${window.location.href}`;
  };

  const generatePairs = useCallback((names: string[]) => {
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
  }, []);

  const createRequestUri = (names: string[]) => {
    names.length > 0
      ? window.history.replaceState(null, "", `?names=${names.join()}`)
      : window.history.replaceState(null, "", "/");
  };

  useEffect(() => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const namesFromUrl = params.get("names");
    if (namesFromUrl) {
      const namesFromUrlArray = namesFromUrl
        .split(",")
        .filter((item) => item !== "")
        .map((item) => decodeURIComponent(item).trim());
      setNames(namesFromUrlArray);
      generatePairs(namesFromUrlArray);
    }
  }, [generatePairs]);

  return (
    <>
      <div className="App">
        <Col>
          <Row align="middle" justify="center" gutter={[8, 36]}>
            <Col>
              <img height="100" width="100" alt={"logo"} src={logo} />
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
              onEnter={(names) => {
                createRequestUri(names);
                generatePairs(names);
              }}
            />
            <Col>
              <RollButton
                doAnimation={doRollAnimation}
                onClick={() => {
                  createRequestUri(names);
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
              <DndCards
                highlightClassName={hover ? "pair-card-hover" : ""}
                pairs={pairs}
                onPairChange={(newPairs) => setPairs(newPairs)}
              />
            </div>
          </Row>
          <Row align="middle" justify="center">
            <div className={"copy-container"}>
              {pairs.length > 0 && (
                <Tooltip
                  placement="right"
                  color={"white"}
                  overlayClassName={"copied-tooltip"}
                  trigger={"click"}
                  visible={tooltipVisible}
                  title={
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Copied!
                    </span>
                  }
                >
                  <Button
                    className="copy-button"
                    onMouseEnter={() => {
                      setHover(true);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                    }}
                    onClick={() => {
                      setTooltipVisible(true);
                      setTimeout(() => {
                        setTooltipVisible(false);
                      }, 1000);
                      navigator.clipboard.writeText(createCopyString(pairs));
                    }}
                    style={{ background: "transparent", border: 0 }}
                  >
                    <CopyOutlined className="copy-icon" />
                  </Button>
                </Tooltip>
              )}
            </div>
          </Row>
        </Col>
      </div>
      <a
        className="credits"
        target="_blank"
        href="https://github.com/Christian0411/pair-gen"
      >
        Website by Oscar Martinez & Christian Canizares
        <GithubOutlined
          style={{ marginLeft: "10px", fontSize: "16px", color: "#08c" }}
        />
      </a>

      <ParticlesBg color="#56ca8d" num={40} type="cobweb" bg={true} />
    </>
  );
}

export default App;
