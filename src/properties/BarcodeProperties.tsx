import { useEffect, useState } from "react";
import { useLedStore } from "../store";
import { BarcodeComponent } from "../types";

interface BarcodePropertiesProps {
  component: BarcodeComponent;
}

const BarcodeProperties: React.FC<BarcodePropertiesProps> = ({ component }) => {
  const [localComponent, setLocalComponent] = useState(component);
  const updateComponent = useLedStore((state) => state.updateComponent);

  useEffect(() => {
    updateComponent(localComponent);
  }, [localComponent?.barcodeType]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setLocalComponent((prev) => ({
      ...prev,
      [name]:
        name === "value" || name === "barcodeType" ? value : Number(value),
    }));
  };

  const handleBlur = () => {
    updateComponent(localComponent);
  };

  return (
    <div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="barcodeType"
        >
          Barcode Type
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="barcodeType"
          name="barcodeType"
          value={localComponent.barcodeType}
          onChange={handleInputChange}
        >
          <option value="CODE128">Code 128</option>
          <option value="CODE39">Code 39</option>
          <option value="ean13">EAN-13</option>
          <option value="itf14">ITF-14</option>
          <option value="msi">MSI</option>
          <option value="pharmacode">Pharmacode</option>
          <option value="codabar">Codabar</option>
          <option value="upc">UPC</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="text"
        >
          Value
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="value"
          name="value"
          value={localComponent.value}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
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
    </div>
  );
};

export default BarcodeProperties;
