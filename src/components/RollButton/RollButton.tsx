import { Button } from "antd";
import React, { useEffect, useState } from "react";
import dice from "../../imgs/dice.svg";
import "./RollButton.css";
interface RollButtonProps {
  onClick: () => void;
  onRollAnimationEnd: () => void;
  doAnimation: number;
}

function RollButton({
  onClick,
  doAnimation,
  onRollAnimationEnd,
}: RollButtonProps) {
  const [animation, setAnimation] = useState<number>(doAnimation);

  useEffect(() => {
    setAnimation(doAnimation);
  }, [doAnimation]);

  return (
    <img
      width="30px"
      style={{ cursor: "pointer" }}
      height="30px"
      src={dice}
      className={"center image"}
      onClick={() => {
        onClick();
      }}
      onAnimationEnd={() => {
        setAnimation(0);
        onRollAnimationEnd();
      }}
      data-wobble={animation}
    />
  );
}
export default RollButton;
