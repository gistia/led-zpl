import React from "react";
import { TextComponent } from "../types";

interface TextProps extends Omit<TextComponent, "type"> {}

const Text: React.FC<TextProps> = ({ x, y, width, height, text, fontSize }) => {
  const textStyle: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: width,
    height: height,
    fontSize: fontSize,
  };

  return <div style={textStyle}>{text}</div>;
};

export default Text;
