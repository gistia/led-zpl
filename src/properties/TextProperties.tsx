import { useState } from "react";
import { useLedStore } from "../store";
import { TextComponent } from "../types";

interface TextPropertiesProps {
  component: TextComponent;
}

const TextProperties: React.FC<TextPropertiesProps> = ({ component }) => {
  const [localComponent, setLocalComponent] = useState(component);
  const updateComponent = useLedStore((state) => state.updateComponent);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLocalComponent((prev) => ({
      ...prev,
      [name]: name === "text" ? value : Number(value),
    }));
  };

  const handleBlur = () => {
    console.log("blur", localComponent);
    updateComponent(localComponent);
  };

  return (
    <div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="x-position"
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
          htmlFor="y-position"
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="text"
        >
          Text
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="text"
          name="text"
          value={localComponent.text}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default TextProperties;
