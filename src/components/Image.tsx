import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaImage } from "react-icons/fa";
import { Rnd } from "react-rnd";
import { useStore } from "../store";
import { ComponentType, ImageComponent } from "../types";

interface ImageProps extends Omit<ImageComponent, "type"> {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Image: React.FC<ImageProps> = ({
  id,
  x,
  y,
  width,
  height,
  src,
  onClick,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const updateComponent = useStore((state) => state.updateComponent);
  const selectedComponents = useStore((state) => state.selectedComponents);
  const isSelected = selectedComponents.some((comp) => comp.id === id);

  const imageStyle: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: width,
    height: height,
    overflow: "hidden",
    boxSizing: "border-box",
    outline: isSelected
      ? "2px solid blue"
      : currentSrc
      ? "none"
      : "1px dashed #ccc",
  };

  const handleImageDblClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentSrc(e.target?.result as string);
        updateComponent({
          ...{ id, x, y, width, height, src: e.target?.result as string },
          type: ComponentType.Image,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStop = (_: any, data: any) => {
    updateComponent({
      ...{ id, x: data.x, y: data.y, width, height, src: currentSrc },
      type: ComponentType.Image,
    });
  };

  return (
    <IconContext.Provider value={{ size: "1.7em" }}>
      <Rnd
        default={{ x, y, width, height }}
        style={imageStyle}
        onClick={onClick}
        onDoubleClick={handleImageDblClick}
        onDragStop={handleDragStop}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        {currentSrc ? (
          <img
            src={currentSrc}
            draggable={false}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaImage />
          </div>
        )}
      </Rnd>
    </IconContext.Provider>
  );
};

export default Image;
