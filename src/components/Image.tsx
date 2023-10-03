import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaImage } from "react-icons/fa";
import { Rnd } from "react-rnd";
import { useLedStore } from "../store";
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
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const updateComponent = useLedStore((state) => state.updateComponent);
  const selectedComponents = useLedStore((state) => state.selectedComponents);
  const isSelected = selectedComponents.some((comp) => comp.id === id);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setLockAspectRatio(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setLockAspectRatio(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const imageStyle: React.CSSProperties = {
    position: "absolute",
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

  useEffect(() => {
    if (!src) {
      handleImageDblClick();
    }
  }, []);

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

  const handleResizeStop = (
    _e: any,
    _direction: any,
    _ref: any,
    _delta: any,
    position: { x: number; y: number }
  ) => {
    const newWidth = _ref.style.width.replace("px", "");
    const newHeight = _ref.style.height.replace("px", "");
    updateComponent({
      ...{
        id,
        x: position.x,
        y: position.y,
        width: newWidth,
        height: newHeight,
        src: currentSrc,
      },
      type: ComponentType.Image,
    });
  };

  const handleImageLoad = () => {
    console.log("image loaded");
    if (imgRef.current) {
      const imgWidth = imgRef.current.naturalWidth;
      const imgHeight = imgRef.current.naturalHeight;

      console.log("image width", imgWidth);
      console.log("image height", imgHeight);

      updateComponent({
        ...{ id, x, y, width: imgWidth, height: imgHeight, src: currentSrc },
        type: ComponentType.Image,
      });
    }
  };

  return (
    <IconContext.Provider value={{ size: "1.7em" }}>
      <Rnd
        position={{ x, y }}
        size={{ width, height }}
        style={imageStyle}
        onClick={onClick}
        onDoubleClick={handleImageDblClick}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        lockAspectRatio={lockAspectRatio}
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
            ref={imgRef}
            onLoad={handleImageLoad}
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
