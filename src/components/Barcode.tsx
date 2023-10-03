import React, { useEffect, useState } from "react";
import ReactBarcode from "react-barcode";
import { Rnd } from "react-rnd";
import { useLedStore } from "../store";
import { BarcodeComponent, ComponentType } from "../types";

interface BarcodeProps extends Omit<BarcodeComponent, "type"> {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Barcode: React.FC<BarcodeProps> = ({
  id,
  x,
  y,
  width,
  height,
  value,
  barcodeType,
  isNew,
  onClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const updateComponent = useLedStore((state) => state.updateComponent);
  const selectedComponents = useLedStore((state) => state.selectedComponents);
  const isSelected = selectedComponents.some((comp) => comp.id === id);

  const barcodeStyle: React.CSSProperties = {
    width: width,
    height: height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    boxSizing: "border-box",
    outline: isEditing || isSelected ? "2px solid blue" : "none",
  };

  const handleBarcodeDblClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  useEffect(() => {
    if (isNew) {
      handleBarcodeDblClick();
      updateComponent({
        ...{ id, x, y, width, height, value, barcodeType },
        type: ComponentType.Barcode,
        isNew: false,
      });
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBarcode = event.target.value;
    setCurrentValue(newBarcode);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    updateComponent({
      ...{
        id,
        x,
        y,
        width,
        height,
        value: currentValue,
        barcodeType,
      },
      type: ComponentType.Barcode,
    });
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setCurrentValue(value);
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
        value: currentValue,
        barcodeType,
      },
      type: ComponentType.Barcode,
    });
  };

  const handleResizeStop = (_: any, _direction: any, ref: any, _delta: any) => {
    const newWidth = parseInt(ref.style.width.replace("px", ""), 10);
    const newHeight = parseInt(ref.style.height.replace("px", ""), 10);

    updateComponent({
      ...{
        id,
        x,
        y,
        width: newWidth,
        height: newHeight,
        value: currentValue,
        barcodeType,
      },
      type: ComponentType.Barcode,
    });
  };

  return (
    <Rnd
      position={{ x, y }}
      size={{ width, height }}
      style={barcodeStyle}
      onClick={onClick}
      onDoubleClick={handleBarcodeDblClick}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autoFocus
          style={{ textAlign: "center", width: "100%" }}
        />
      ) : (
        <ReactBarcode
          value={currentValue}
          format={barcodeType}
          width={1}
          height={40}
        />
      )}
    </Rnd>
  );
};

export default Barcode;
