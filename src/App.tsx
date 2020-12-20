import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Tooltip } from "antd";
import "./App.css";
import PairInput from "./components/PairInput/PairInput";
import { Button } from "antd";
import ParticlesBg from "particles-bg";
import logo from "./imgs/logo.png";
import html2canvas from "html2canvas";
import {
  CameraOutlined,
  CopyOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import RollButton from "./components/RollButton/RollButton";
import DragDropCards from "./components/DndCards/DragDropCards";

function App() {
  const [names, setNames] = useState<string[]>([]);

  const [pairs, setPairs] = useState<string[][]>([[]]);

  const [pairCardTitles, setPairCardTitles] = useState<string[]>([]);

  const [doRollAnimation, setDoRollAnimation] = useState<number>(0);

  const [hover, setHover] = useState<boolean>();

  const [tooltipVisible, setTooltipVisible] = useState<boolean>();

  const [screenshotToolTip, setScreenshotToolTip] = useState<boolean>();

  const [dragging, setDragging] = useState<boolean>(false);

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

  const createRequestUri = (names: string[], titles: string[]) => {
    names.length > 0 || titles.length > 0
      ? window.history.replaceState(
          null,
          "",
          `?names=${names.join()}&titles=${titles.join()}`
        )
      : window.history.replaceState(null, "", "/");
  };

  useEffect(() => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const namesFromUrl = params.get("names");
    const titlesFromUrl = params.get("titles");
    if (namesFromUrl) {
      const namesFromUrlArray = namesFromUrl
        .split(",")
        .filter((item) => item !== "")
        .map((item) => decodeURIComponent(item).trim().substring(0, 18));
      setNames(namesFromUrlArray);
      generatePairs(namesFromUrlArray);
    }
    if (titlesFromUrl) {
      const titlesFromUrlArray = titlesFromUrl
        .split(",")
        .map((item, index) => (item === "" ? `Pair ${index}` : item))
        .map((item) => decodeURIComponent(item).trim().substring(0, 18));
      setPairCardTitles(titlesFromUrlArray);
    }
  }, [generatePairs]);

  const handleScreenshot = () => {
    const input = document.getElementById("capture");
    const logo = document.getElementById("logo-container");

    if (input) {
      html2canvas(input, {
        backgroundColor: "#181823",
        onclone: (doc) => {
          doc.getElementById("add-new-card-container")?.remove();
          logo && doc.getElementById("capture")?.appendChild(logo);
        },
      }).then((canvas: any) => {
        // Wait for animations
        setTimeout(() => {
          canvas.toBlob(function (blob: any) {
            navigator.clipboard.write([
              new ClipboardItem(
                Object.defineProperty({}, blob.type, {
                  value: blob,
                  enumerable: true,
                })
              ),
            ]);
            setScreenshotToolTip(true);
          });
        }, 500);
      });
    }
  };
  useEffect(() => {
    if (screenshotToolTip) setTimeout(() => setScreenshotToolTip(false), 1000);
  }, [screenshotToolTip]);
  return (
    <>
      <div className="App">
        <Col>
          <Row
            id="logo-container"
            align="middle"
            justify="center"
            gutter={[8, 36]}
          >
            <Col>
              <img id="logo" height="100" width="100" alt={"logo"} src={logo} />
            </Col>
            <Col>
              <span id="logo-text" className="title-text">
                Pair Gen
              </span>
            </Col>
          </Row>
          <Row align="middle" justify="center" gutter={[8, 8]}>
            <PairInput
              names={names}
              dragging={dragging}
              onNewName={(names) => {
                setNames(names);
              }}
              onEnter={(names) => {
                createRequestUri(names, pairCardTitles);
                generatePairs(names);
              }}
            />
            <Col>
              <RollButton
                doAnimation={doRollAnimation}
                onClick={() => {
                  createRequestUri(names, pairCardTitles);
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
              id="capture"
              className={`pair-card-container ${
                hover ? "pair-card-container-hover" : ""
              }`}
            >
              {pairs.filter((pair) => pair.length).length > 0 && (
                <DragDropCards
                  highlightClassName={hover ? "pair-card-hover" : ""}
                  pairs={pairs}
                  cardTitles={pairCardTitles}
                  onTitleChange={(titles) => {
                    createRequestUri(names, titles);
                    setPairCardTitles(titles);
                  }}
                  onPairChange={(newPairs) => setPairs(newPairs)}
                  onDrag={(isDragging) => setDragging(isDragging)}
                />
              )}
            </div>
          </Row>
          <Row align="middle" justify="center">
            <div className={"copy-container"}>
              {pairs.filter((pair) => pair.length).length > 0 && (
                <>
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
                  <Tooltip
                    placement="right"
                    color={"white"}
                    overlayClassName={"copied-tooltip"}
                    trigger={"click"}
                    visible={screenshotToolTip}
                    title={
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        Copied Screenshot!
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
                        handleScreenshot();
                      }}
                      style={{ background: "transparent", border: 0 }}
                    >
                      <CameraOutlined className="copy-icon" />
                    </Button>
                  </Tooltip>
                </>
              )}
            </div>
          </Row>
        </Col>
      </div>
      <a
        className="version"
        rel="noreferrer"
        target="_blank"
        href="https://github.com/Christian0411/pair-gen"
      >
        Version 1.2
        <GithubOutlined
          style={{ marginLeft: "10px", fontSize: "16px", color: "#08c" }}
        />
      </a>

      <span className="credits">
        Website by Oscar Martinez & Christian Canizares
      </span>

      <ParticlesBg color="#56ca8d" num={40} type="cobweb" bg={true} />
    </>
  );
}

export default App;
