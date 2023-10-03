import React, { useEffect } from "react";
import Barcode from "./components/Barcode";
import Image from "./components/Image";
import Text from "./components/Text";
import { useLedStore } from "./store";
import { AllComponents, ComponentType } from "./types";

const Canvas: React.FC = () => {
  const components = useLedStore((store) => store.components);
  const selectComponent = useLedStore((store) => store.selectComponent);
  const toggleComponentSelection = useLedStore(
    (store) => store.toggleComponentSelection
  );
  const removeComponent = useLedStore((store) => store.removeComponent);
  const clearSelection = useLedStore((store) => store.clearSelection);
  const selectedComponents = useLedStore((store) => store.selectedComponents);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        const selected = selectedComponents;
        selected.forEach((component) => {
          removeComponent(component);
        });
        clearSelection();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [removeComponent, clearSelection, selectedComponents]);

  const handleClick = () => {
    clearSelection();
  };

  const handleComponentClick = (
    event: React.MouseEvent,
    component: AllComponents
  ) => {
    const isModifierKeyPressed = event.metaKey || event.ctrlKey;
    event.stopPropagation();
    if (isModifierKeyPressed) {
      toggleComponentSelection(component);
    } else {
      selectComponent(component);
    }
  };

  return (
    <div
      className="flex-grow bg-gray-200 grid place-items-center"
      onClick={handleClick}
    >
      <div className="bg-white rounded-2xl canvas relative">
        {components.map((component) => {
          switch (component.type) {
            case ComponentType.Text:
              return (
                <Text
                  key={`${component.id}-${component.text}`}
                  {...component}
                  onClick={(event) => handleComponentClick(event, component)}
                />
              );
            case ComponentType.Image:
              return (
                <Image
                  key={`${component.id}`}
                  {...component}
                  onClick={(event) => handleComponentClick(event, component)}
                />
              );
            case ComponentType.Barcode:
              return (
                <Barcode
                  key={`${component.id}-${component.value}-${component.barcodeType}`}
                  {...component}
                  onClick={(event) => handleComponentClick(event, component)}
                />
              );
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
