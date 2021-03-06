import { EditOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { Key } from "../../constants/Constants";

interface EditableLabelProps {
  labelText: string;
  onChange: (label: string) => void;
}

function EditableLabel({ labelText, onChange }: EditableLabelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputHover, setInputHover] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(labelText);

  const handleInput = (e: any) => {
    if (e.which === Key.ENTER) {
      if (e.target.value.trim(" ") !== "") {
        onChange(label);
        e.target.blur();
      }
    }
  };

  return (
    <div
      onClick={() => {
        inputRef.current?.select();
      }}
      onMouseEnter={() => setInputHover(true)}
      onMouseLeave={() => setInputHover(false)}
      className="card-title-input-container"
    >
      <input
        ref={inputRef}
        maxLength={16}
        className={`card-title-input ${
          isEditing && "card-title-input-editable"
        }`}
        onChange={(e) => setLabel(e.target.value)}
        onClick={(e) => {
          e.currentTarget.select();
        }}
        onBlur={(e) => {
          onChange(label);
          setIsEditing(false);
        }}
        onFocus={(e) => setIsEditing(true)}
        onKeyDown={(e) => handleInput(e)}
        value={label}
      />
      {(isEditing || inputHover) && <EditOutlined />}
    </div>
  );
}

export default EditableLabel;
