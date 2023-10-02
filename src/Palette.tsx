import React from "react";
import { IconContext } from "react-icons";
import {
  FaBarcode,
  FaIcons,
  FaImage,
  FaShapes,
  FaTextHeight,
} from "react-icons/fa";
import { useStore } from "./store";
import { AllComponents, ComponentType } from "./types";

const ComponentIcons = {
  [ComponentType.Text]: <FaTextHeight />,
  [ComponentType.Barcode]: <FaBarcode />,
  [ComponentType.Image]: <FaImage />,
  [ComponentType.Shape]: <FaShapes />,
  [ComponentType.Icon]: <FaIcons />,
};

const createDefaultComponent = (type: ComponentType): AllComponents => {
  switch (type) {
    case ComponentType.Text:
      return {
        type,
        x: 0,
        y: 0,
        text: "Default Text",
        fontSize: 14,
        width: 100,
        height: 20,
      };
    case ComponentType.Barcode:
      return { type, x: 0, y: 0, barcode: "12345678", width: 100, height: 40 };
    case ComponentType.Image:
      return { type, x: 0, y: 0, src: "default.jpg", width: 100, height: 100 };
    case ComponentType.Shape:
      return { type, x: 0, y: 0, color: "red", width: 50, height: 50 };
    case ComponentType.Icon:
      return { type, x: 0, y: 0, icon: "default-icon", width: 30, height: 30 };
    default:
      throw new Error("Invalid component type");
  }
};

const Palette: React.FC = () => {
  const addComponent = useStore((state) => state.addComponent);

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
