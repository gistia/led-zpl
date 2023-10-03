import React from "react";
import { IconContext } from "react-icons";
import {
  FaBarcode,
  FaIcons,
  FaImage,
  FaShapes,
  FaTextHeight,
} from "react-icons/fa";
import { useLedStore } from "./store";
import { AllComponents, ComponentType } from "./types";

const ComponentIcons = {
  [ComponentType.Text]: <FaTextHeight />,
  [ComponentType.Barcode]: <FaBarcode />,
  [ComponentType.Image]: <FaImage />,
  [ComponentType.Shape]: <FaShapes />,
  [ComponentType.Icon]: <FaIcons />,
};

const createDefaultComponent = (type: ComponentType): AllComponents => {
  const id = Date.now().toString();

  switch (type) {
    case ComponentType.Text:
      return {
        id,
        type,
        x: 0,
        y: 0,
        text: "Default Text",
        fontSize: 14,
        width: 100,
        height: 20,
        isNew: true,
      };
    case ComponentType.Barcode:
      return {
        id,
        type,
        x: 0,
        y: 0,
        barcode: "12345678",
        width: 100,
        height: 40,
        isNew: true,
      };
    case ComponentType.Image:
      return {
        id,
        type,
        x: 0,
        y: 0,
        src: null,
        width: 100,
        height: 100,
        isNew: true,
      };
    case ComponentType.Shape:
      return {
        id,
        type,
        x: 0,
        y: 0,
        color: "red",
        width: 50,
        height: 50,
        isNew: true,
      };
    case ComponentType.Icon:
      return {
        id,
        type,
        x: 0,
        y: 0,
        icon: "default-icon",
        width: 30,
        height: 30,
        isNew: true,
      };
    default:
      throw new Error("Invalid component type");
  }
};

const Palette: React.FC = () => {
  const addComponent = useLedStore((state) => state.addComponent);

  const handleIconClick = (type: ComponentType) => {
    const component = createDefaultComponent(type);
    addComponent(component);
  };

  const icons = Object.entries(ComponentIcons).map(([type, icon]) => (
    <div
      key={type}
      className="p-2 mb-3 cursor-pointer hover:bg-gray-100"
      onClick={() => handleIconClick(type as ComponentType)}
    >
      {icon}
    </div>
  ));

  return (
    <IconContext.Provider value={{ size: "1.7em" }}>
      <div className="bg-white w-16 flex flex-col items-center flex-none border-solid border-1 border-gray-700 p-2">
        {icons}
      </div>
    </IconContext.Provider>
  );
};

export default Palette;
