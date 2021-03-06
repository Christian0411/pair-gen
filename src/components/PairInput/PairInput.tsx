import { Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Key } from "../../constants/Constants";
import "./PairInput.css";

interface PairInputProps {
  names: string[];
  dragging: boolean;
  onNewName: (names: string[]) => void;
  onEnter: (names: string[]) => void;
}

function PairInput({ names, dragging, onNewName, onEnter }: PairInputProps) {
  const [tags, setTags] = useState<string[]>([]);

  const [nameInput, setNameInput] = useState<string>("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dragging) nameInputRef.current?.blur();
  }, [dragging]);

  useEffect(() => {
    if (JSON.stringify(tags) !== JSON.stringify(names)) {
      setTags(names);
    }
  }, [names]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (JSON.stringify(tags) !== JSON.stringify(names)) {
      onNewName(tags);
    }
  }, [tags]); // eslint-disable-line react-hooks/exhaustive-deps

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
      if (e.target.value.trim(" ") !== "") {
        addTag(e.target.value.substring(0, 18));
        onEnter([...tags, e.target.value.substring(0, 18)]);
      } else {
        onEnter(tags);
      }
    }
  };

  const editTag = (e: any, item: string, index: number) => {
    // console.log(item, index)
    // e.preventDefault();
    // const newTags = tags.filter((tag) => tag !== item)
    // setTags([...newTags]);
    // setNameInput(item);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text");
    let pastedTags;

    const pastedTagsNewline = pasted
      .replace(/\r/g, "")
      .split(/\n/)
      .filter((item) => item !== "")
      .map((item) => item.substring(0, 18));

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
        {tags.map((item: string, index) => (
          <Tag
            key={index}
            style={{ margin: "4px", display: "flex", alignItems: "center" }}
            closable
            onDoubleClick={(e) => editTag(e, item, index)}
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
