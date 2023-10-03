import React, { useEffect, useState } from "react";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { FiSettings, FiUser } from "react-icons/fi";
import Divider from "./header/Divider";
import IconButton from "./header/IconButton";
import RoundButton from "./header/RoundButton";
import { useLedStore } from "./store";

const Header: React.FC = () => {
  const setZoom = useLedStore((state) => state.setZoom);
  const gridSize = useLedStore((state) => state.gridSize);
  const zoom = useLedStore((state) => state.zoom);
  const showGrid = useLedStore((state) => state.showGrid);
  const setGridSize = useLedStore((state) => state.setGridSize);
  const snapToGrid = useLedStore((state) => state.snapToGrid);
  const toggleGrid = useLedStore((state) => state.toggleGrid);
  const toggleSnapToGrid = useLedStore((state) => state.toggleSnapToGrid);

  const [localZoom, setLocalZoom] = useState(zoom);
  const [localGridSize, setLocalGridSize] = useState(gridSize);

  useEffect(() => {
    setZoom(localZoom);
  }, [localZoom]);

  useEffect(() => {
    setGridSize(localGridSize);
  }, [localGridSize]);

  return (
    <div className="bg-gray-100 p-2 shadow-md border-b border-gray-300 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold p-2 mr-4">Led ZPL</h1>
        <Divider />
        <IconButton Icon={AiFillHome} label="Home" />
        <IconButton Icon={AiOutlineMenu} label="Menu" />
      </div>
      <div className="flex space-x-4">
        <Divider />
        <div className="flex flex-col mr-6">
          <label className="flex items-center space-x-2 select-none">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={() => toggleGrid()}
            />
            <span>Show Grid</span>
          </label>
          <label className="flex items-center space-x-2 select-none">
            <input
              type="checkbox"
              checked={snapToGrid}
              onChange={() => toggleSnapToGrid()}
            />
            <span>Snap to Grid</span>
          </label>
        </div>
        <Divider />
        <div className="flex flex-col mr-6 space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="gridSize" className="text-right flex-1">
              Grid Size:
            </label>
            <div className="flex items-center">
              <input
                id="gridSize"
                type="number"
                value={gridSize}
                onChange={(e) => setLocalGridSize(Number(e.target.value))}
                className="ml-2 w-14 py-0.5 p-1 text-xs border rounded text-center"
              />
              <span className="ml-1 text-xs">px</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="zoom" className="text-right flex-1">
              Zoom:
            </label>
            <div className="flex items-center">
              <input
                id="zoom"
                type="number"
                value={zoom * 100}
                onChange={(e) => setLocalZoom(Number(e.target.value) / 100)}
                className="ml-2 w-14 py-0.5 p-1 text-xs border rounded text-center"
              />
              <span className="ml-1 text-xs">%</span>
            </div>
          </div>
        </div>
        <Divider />
        <RoundButton Icon={FiSettings} />
        <RoundButton Icon={FiUser} />
      </div>
    </div>
  );
};

export default Header;
