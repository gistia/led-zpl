import { IconContext } from "react-icons";
import {
  PiAlignBottomDuotone,
  PiAlignCenterHorizontalDuotone,
  PiAlignCenterVerticalDuotone,
  PiAlignLeftDuotone,
  PiAlignRightDuotone,
  PiAlignTopDuotone,
} from "react-icons/pi";
import {
  RiBringForward,
  RiBringToFront,
  RiSendBackward,
  RiSendToBack,
} from "react-icons/ri";
import colors from "tailwindcss/colors";
import { useLedStore } from "./store";
import { CommandType } from "./types";

const Commands: React.FC = () => {
  const {
    selectedComponents,
    bringForward,
    bringToFront,
    sendBackward,
    sendToBack,
    align,
  } = useLedStore();
  const isAlignDisabled = selectedComponents.length <= 1;
  const isSendBringDisabled = selectedComponents.length === 0;

  const CommandIcons = {
    [CommandType.AlignLeft]: <PiAlignLeftDuotone />,
    [CommandType.AlignCenter]: <PiAlignCenterHorizontalDuotone />,
    [CommandType.AlignRight]: <PiAlignRightDuotone />,
    [CommandType.AlignTop]: <PiAlignTopDuotone />,
    [CommandType.AlignMiddle]: <PiAlignCenterVerticalDuotone />,
    [CommandType.AlignBottom]: <PiAlignBottomDuotone />,
    ["div"]: <div className="w-8 border-b border-gray-300" />,
    [CommandType.BringForward]: isSendBringDisabled ? (
      <RiBringForward color={colors.gray[400]} />
    ) : (
      <RiBringForward color={colors.gray[700]} />
    ),
    [CommandType.SendBackward]: isSendBringDisabled ? (
      <RiSendBackward color={colors.gray[400]} />
    ) : (
      <RiSendBackward color={colors.gray[700]} />
    ),
    [CommandType.BringToFront]: isSendBringDisabled ? (
      <RiBringToFront color={colors.gray[400]} />
    ) : (
      <RiBringToFront color={colors.gray[700]} />
    ),
    [CommandType.SendToBack]: isSendBringDisabled ? (
      <RiSendToBack color={colors.gray[400]} />
    ) : (
      <RiSendToBack color={colors.gray[700]} />
    ),
  };

  const handleIconClick = (commandType: CommandType) => {
    if (
      (isAlignDisabled &&
        [
          CommandType.AlignBottom,
          CommandType.AlignCenter,
          CommandType.AlignLeft,
          CommandType.AlignMiddle,
          CommandType.AlignRight,
          CommandType.AlignTop,
        ].includes(commandType)) ||
      (isSendBringDisabled &&
        [
          CommandType.BringForward,
          CommandType.BringToFront,
          CommandType.SendBackward,
          CommandType.SendToBack,
        ].includes(commandType))
    ) {
      return;
    }

    const selectedComponent = selectedComponents[0];

    if (selectedComponent) {
      switch (commandType) {
        case CommandType.BringForward:
          bringForward(selectedComponent);
          break;
        case CommandType.BringToFront:
          bringToFront(selectedComponent);
          break;
        case CommandType.SendBackward:
          sendBackward(selectedComponent);
          break;
        case CommandType.SendToBack:
          sendToBack(selectedComponent);
          break;
        case CommandType.AlignBottom:
        case CommandType.AlignCenter:
        case CommandType.AlignLeft:
        case CommandType.AlignMiddle:
        case CommandType.AlignRight:
        case CommandType.AlignTop:
          align(commandType);
          break;
      }
    }
  };

  const icons = Object.entries(CommandIcons).map(([type, icon]) => {
    const isDisabled =
      ([
        CommandType.AlignBottom,
        CommandType.AlignCenter,
        CommandType.AlignLeft,
        CommandType.AlignMiddle,
        CommandType.AlignRight,
        CommandType.AlignTop,
      ].includes(type as CommandType) &&
        isAlignDisabled) ||
      ([
        CommandType.BringForward,
        CommandType.BringToFront,
        CommandType.SendBackward,
        CommandType.SendToBack,
      ].includes(type as CommandType) &&
        isSendBringDisabled);

    return (
      <div
        key={type}
        className={`p-2 mb-3 ${
          isDisabled
            ? "opacity-50"
            : "cursor-pointer hover:bg-gray-200 rounded-xl"
        }`}
        onClick={() => handleIconClick(type as CommandType)}
        // title={ComponentDescriptions[type as ComponentType]}
      >
        {icon}
      </div>
    );
  });

  return (
    <IconContext.Provider value={{ size: "1.7em" }}>
      <div className="bg-gray-100 w-16 flex flex-col items-center flex-none border-l border-gray-300 p-4">
        {icons}
      </div>
    </IconContext.Provider>
  );
};

export default Commands;
