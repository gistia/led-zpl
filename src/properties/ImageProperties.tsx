import React, { useRef, useState } from "react";
import { useLedStore } from "../store";
import { ImageComponent } from "../types";

interface ImagePropertiesProps {
  component: ImageComponent;
}

const ImageProperties: React.FC<ImagePropertiesProps> = ({ component }) => {
  const [localComponent, setLocalComponent] = useState(component);
  const updateComponent = useLedStore((state) => state.updateComponent);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLocalComponent((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => {
    updateComponent(localComponent);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalComponent((prev) => ({
          ...prev,
          src: e.target?.result as string,
        }));
        updateComponent({ ...localComponent, src: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageChange = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="x"
        >
          X Position
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="x"
          name="x"
          type="number"
          value={localComponent.x}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="y"
        >
          Y Position
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="y"
          name="y"
          type="number"
          value={localComponent.y}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="width"
        >
          Width
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="width"
          name="width"
          type="number"
          value={localComponent.width}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="height"
        >
          Height
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="height"
          name="height"
          type="number"
          value={localComponent.height}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />
        <button
          onClick={triggerImageChange}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Image
        </button>
      </div>
    </div>
  );
};

export default ImageProperties;
