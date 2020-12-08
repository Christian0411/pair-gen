import { Tag } from "antd";
import { Button, message, Input } from "antd";
import React, { Component } from "react";
import { useState } from "react";
import "./PairInput.css";
interface PairInputProps {
  className: string;
}

function PairInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const addTag = (e: any) => {
    e.which = e.which || e.keyCode;
    if (e.which == 32) {
      if (e.target.value.trim(" ") !== "") {
        setTags([...tags, String(e.target.value)]);
        setName("");
      }
    }
  };

  return (
    <>
      <div className="input-container">
        {tags.map((item: string) => (
          <Tag
            style={{ margin: "4px", display: "flex", alignItems: "center" }}
            closable
            onClose={() => setTags([])}
            color="#63b89e"
          >
            {item}
          </Tag>
        ))}
        <input
          className="pair-input"
          onChange={(e) => setName(String(e.target.value))}
          onKeyDown={addTag}
          value={name}
        />
      </div>
    </>
  );
}

export default PairInput;
