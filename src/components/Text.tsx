import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { useLedStore } from "../store";
import { ComponentType, TextComponent } from "../types";

interface TextProps extends Omit<TextComponent, "type"> {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Text: React.FC<TextProps> = ({
  id,
  x,
  y,
  width,
  height,
  text,
  fontSize,
  isNew,
  onClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const updateComponent = useLedStore((state) => state.updateComponent);
  const selectedComponents = useLedStore((state) => state.selectedComponents);
  const isSelected = selectedComponents.some((comp) => comp.id === id);

  const textStyle: React.CSSProperties = {
    width: width,
    height: height,
    fontSize: fontSize,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    boxSizing: "border-box",
    outline: isEditing || isSelected ? "2px solid blue" : "none",
  };

  const handleTextDblClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.select(); // Select the text inside the input
    }, 0);
  };

  useEffect(() => {
    if (isNew) {
      handleTextDblClick();
      // Update the component to set isNew to false
      updateComponent({
        ...{ id, x, y, width, height, text, fontSize },
        type: ComponentType.Text,
        isNew: false,
      });
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setCurrentText(newText);

    // updateComponent({
    //   ...{ id, x, y, width, height, text: newText, fontSize },
    //   type: ComponentType.Text,
    // });
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setCurrentText(text);
      setIsEditing(false);
    }
  };

  const handleDragStop = (_: any, data: any) => {
    updateComponent({
      ...{
        id,
        x: data.x,
        y: data.y,
        width,
        height,
        text: currentText,
        fontSize,
      },
      type: ComponentType.Text,
    });
  };

  const handleResizeStop = (_: any, _direction: any, ref: any, _delta: any) => {
    const newWidth = ref.style.width.replace("px", "");
    const newHeight = ref.style.height.replace("px", "");

    updateComponent({
      ...{
        id,
        x,
        y,
        width: newWidth,
        height: newHeight,
        text: currentText,
        fontSize,
      },
      type: ComponentType.Text,
    });
  };

  return (
    <Rnd
      position={{ x, y }}
      size={{ width, height }}
      style={textStyle}
      onClick={onClick}
      onDoubleClick={handleTextDblClick}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      ) : (
        currentText
      )}
    </Rnd>
  );
};

export default Text;
