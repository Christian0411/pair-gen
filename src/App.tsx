import React, { Component } from "react";
import logo from "./logo.svg";

import "./App.css";
import PairInput from "./components/PairInput";
function App() {
  return (
    <div className="App">
      <div className="title-container">
        <h1 className="title-text">Pairs</h1>
      </div>
      <div className="pair-input-container">
        <PairInput />
      </div>
    </div>
  );
}

export default App;
