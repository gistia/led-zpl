import React from "react";
import Text from "./components/Text";
import { useStore } from "./store";
import { ComponentType } from "./types";

const Canvas: React.FC = () => {
  const components = useStore((store) => store.components);

  return (
    <div className="flex-grow bg-gray-200 grid place-items-center">
      <div className="bg-white rounded-2xl canvas relative">
        {components.map((component, index) => {
          switch (component.type) {
            case ComponentType.Text:
              return <Text key={index} {...component} />;
            // case ComponentType.Barcode:
            //   return <BarcodeComponentRenderer key={index} {...component} />;
            // case ComponentType.Image:
            //   return <ImageComponentRenderer key={index} {...component} />;
            // case ComponentType.Shape:
            //   return <ShapeComponentRenderer key={index} {...component} />;
            // case ComponentType.Icon:
            //   return <IconComponentRenderer key={index} {...component} />;
            default:
              return null; // Or some other fallback
          }
        })}
      </div>
    </div>
  );
};

export default Canvas;
