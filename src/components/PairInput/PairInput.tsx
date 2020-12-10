import { Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./PairInput.css";

interface PairInputProps {
  names: string[];
  onNewName: (names: string[]) => void;
  onEnter: (names: string[]) => void;
}

const Key = {
  SPACE: 32,
  BACKSPACE: 8,
  LEFT_ARROW: 37,
  ENTER: 13,
  TAB: 9,
};

function PairInput({ names, onNewName, onEnter }: PairInputProps) {
  const [tags, setTags] = useState<string[]>([]);

  const [nameInput, setNameInput] = useState<string>("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTags(names);
  }, [names]);

  useEffect(() => {
    onNewName(names);
  }, [tags, names, onNewName]);

  const handleInput = (e: any) => {
    e.which = e.which || e.keyCode;
    if (e.which === Key.SPACE || e.which === Key.TAB) {
      if (e.target.value.trim(" ") !== "") {
        e.preventDefault();
        addTag(e.target.value);
      }
    } else if (e.which === Key.BACKSPACE) {
      if (e.target.value === "") {
        popTag();
      }
    } else if (e.which === Key.LEFT_ARROW) {
      if (e.target.value === "") {
        e.preventDefault();
        const item = popTag();
        setNameInput(item);
      }
    } else if (e.which === Key.ENTER) {
      console.log(e.target.value);
      if (e.target.value !== "") {
        addTag(e.target.value);
        onEnter([...tags, e.target.value]);
      } else {
        onEnter(tags);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text");
    let pastedTags;

    const pastedTagsNewline = pasted
      .replace(/\r/g, "")
      .split(/\n/)
      .filter((item) => item !== "");

    if (pastedTagsNewline.length === 1) {
      pastedTags = pasted.split(" ").filter((item) => item !== "");
    } else {
      pastedTags = pastedTagsNewline;
    }

    setTags([...tags, ...pastedTags]);
    setNameInput("");
    e.preventDefault();
  };

  const addTag = (tag: string) => {
    setTags([...tags, String(tag)]);
    setNameInput("");
  };

  const popTag = (): string => {
    const item = tags.pop();
    setTags([...tags]);
    return item ?? "";
  };

  const deleteTag = (item: string) => {
    const newTags = tags.filter((tag) => tag !== item);
    setTags(newTags);
    nameInputRef?.current?.focus();
  };

  return (
    <>
      <div className="input-container">
        {tags.map((item: string) => (
          <Tag
            style={{ margin: "4px", display: "flex", alignItems: "center" }}
            closable
            onClose={(e) => {
              e.preventDefault();
              deleteTag(item);
            }}
            color="#63b89e"
          >
            {item}
          </Tag>
        ))}
        <input
          className="pair-input"
          ref={nameInputRef}
          autoFocus
          placeholder={(() => {
            return tags.length ? "" : "Enter names. Ex. chris robert oscar";
          })()}
          onChange={(e) => setNameInput(String(e.target.value))}
          onPaste={handlePaste}
          onKeyDown={handleInput}
          value={nameInput}
        />
      </div>
    </>
  );
}

export default PairInput;
