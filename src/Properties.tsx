import React from "react";
import BarcodeProperties from "./properties/BarcodeProperties";
import ImageProperties from "./properties/ImageProperties";
import TextProperties from "./properties/TextProperties";
import { useLedStore } from "./store";
import {
  AllComponents,
  BarcodeComponent,
  ComponentType,
  ImageComponent,
} from "./types";

type PropertiesPanelProps = {
  component: AllComponents;
};

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ component }) => {
  switch (component.type) {
    case ComponentType.Text:
      return <TextProperties component={component} />;
    case ComponentType.Image:
      return <ImageProperties component={component as ImageComponent} />;
    case ComponentType.Barcode:
      return <BarcodeProperties component={component as BarcodeComponent} />;
    default:
      return <p>Select a component to view its properties.</p>;
  }
};

const Properties: React.FC = () => {
  const selectedComponents = useLedStore((state) => state.selectedComponents);

  if (selectedComponents.length === 0 || selectedComponents.length > 1) {
    return (
      <div className="bg-white w-80 flex-none border-solid border-1 border-gray-700"></div>
    );
  }

  const selectedComponent = selectedComponents[0];

  return (
    <div className="bg-white w-80 flex-none border-solid border-1 border-gray-700 p-4">
      <PropertiesPanel
        key={selectedComponent?.id + selectedComponent?.lastModified}
        component={selectedComponent}
      />
    </div>
  );
};

export default Properties;
