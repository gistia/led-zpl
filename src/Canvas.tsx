import React, { useEffect } from "react";
import Image from "./components/Image";
import Text from "./components/Text";
import { useStore } from "./store";
import { AllComponents, ComponentType } from "./types";

const Canvas: React.FC = () => {
  const components = useStore((store) => store.components);
  const selectComponent = useStore((store) => store.selectComponent);
  const toggleComponentSelection = useStore(
    (store) => store.toggleComponentSelection
  );
  const removeComponent = useStore((store) => store.removeComponent);
  const clearSelection = useStore((store) => store.clearSelection);
  const selectedComponents = useStore((store) => store.selectedComponents);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
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
    <div className="flex-grow bg-gray-200 grid place-items-center">
      <div
        className="bg-white rounded-2xl canvas relative"
        onClick={handleClick}
      >
        {components.map((component, index) => {
          switch (component.type) {
            case ComponentType.Text:
              return (
                <Text
                  key={component.id}
                  {...component}
                  onClick={(event) => handleComponentClick(event, component)}
                />
              );
            // case ComponentType.Barcode:
            //   return <BarcodeComponentRenderer key={index} {...component} />;
            case ComponentType.Image:
              return (
                <Image
                  key={component.id}
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
