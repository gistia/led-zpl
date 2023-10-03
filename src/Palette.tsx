import React from "react";
import { IconContext } from "react-icons";
import { BiBarcode, BiImage } from "react-icons/bi";
import { CgFormatText } from "react-icons/cg";
import { LuShapes } from "react-icons/lu";
import { TbIcons } from "react-icons/tb";
import { useLedStore } from "./store";
import { AllComponents, ComponentType } from "./types";

const ComponentIcons = {
  [ComponentType.Text]: <CgFormatText />,
  [ComponentType.Barcode]: <BiBarcode />,
  [ComponentType.Image]: <BiImage />,
  [ComponentType.Shape]: <LuShapes />,
  [ComponentType.Icon]: <TbIcons />,
};

const ComponentDescriptions = {
  [ComponentType.Text]: "Text",
  [ComponentType.Barcode]: "Barcode",
  [ComponentType.Image]: "Image",
  [ComponentType.Shape]: "Shape",
  [ComponentType.Icon]: "Icon",
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
        value: "12345678",
        barcodeType: "CODE128",
        width: 100,
        height: 80,
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
      className="p-2 mb-3 cursor-pointer hover:bg-gray-200 hover:rounded-xl"
      onClick={() => handleIconClick(type as ComponentType)}
      title={ComponentDescriptions[type as ComponentType]}
    >
      {icon}
    </div>
  ));

  return (
    <IconContext.Provider value={{ size: "1.7em" }}>
      <div className="bg-gray-100 w-16 flex flex-col items-center flex-none border-r border-gray-300 p-2">
        {icons}
      </div>
    </IconContext.Provider>
  );
};

export default Palette;
