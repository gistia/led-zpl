import { create } from "zustand";
import { AllComponents, CommandType } from "./types";

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 250;
const PADDING = 20;

interface Store {
  width: number;
  height: number;
  zoom: number;
  components: AllComponents[];
  selectedComponents: AllComponents[];
  lastPosition: { x: number; y: number };

  addComponent: (component: AllComponents) => void;
  removeComponent: (component: AllComponents) => void;
  updateComponent: (component: AllComponents) => void;

  selectComponent: (component: AllComponents) => void;
  toggleComponentSelection: (component: AllComponents) => void;
  clearSelection: () => void;

  align: (commandType: CommandType) => void;

  bringForward: (component: AllComponents) => void;
  bringToFront: (component: AllComponents) => void;
  sendBackward: (component: AllComponents) => void;
  sendToBack: (component: AllComponents) => void;
}

export const useLedStore = create<Store>((set) => ({
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  zoom: 1,
  components: [],
  selectedComponents: [],
  lastPosition: { x: 5, y: 5 },

  addComponent: (component: AllComponents) =>
    set((state) => {
      const { x, y } = state.lastPosition;

      const newPosition = {
        x: x + PADDING,
        y: y + PADDING,
      };

      const newComponent = {
        ...component,
        id: Date.now().toString(),
        x: newPosition.x,
        y: newPosition.y,
      };

      return {
        lastPosition: newPosition,
        components: [...state.components, newComponent],
      };
    }),
  updateComponent: (component: AllComponents) => {
    const updatedComponent = {
      ...component,
      lastModified: Date.now(),
    };
    set((state) => ({
      components: state.components.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      ),
    }));
  },
  removeComponent: (componentToRemove: AllComponents) =>
    set((state) => ({
      components: state.components.filter(
        (comp) => comp.id !== componentToRemove.id
      ),
    })),

  selectComponent: (component: AllComponents) =>
    set(() => ({
      selectedComponents: [component],
    })),
  toggleComponentSelection: (component: AllComponents) =>
    set((state) => ({
      selectedComponents: state.selectedComponents.some(
        (comp) => comp.id === component.id
      )
        ? state.selectedComponents.filter((comp) => comp.id !== component.id)
        : [...state.selectedComponents, component],
    })),
  clearSelection: () =>
    set(() => ({
      selectedComponents: [],
    })),

  bringForward: (component: AllComponents) =>
    set((state) => {
      const index = state.components.findIndex(
        (comp) => comp.id === component.id
      );
      if (index <= 0) return { ...state }; // Already at the front or not found

      const newComponents = [...state.components];
      [newComponents[index - 1], newComponents[index]] = [
        newComponents[index],
        newComponents[index - 1],
      ];

      return { components: newComponents };
    }),

  bringToFront: (component: AllComponents) =>
    set((state) => {
      const index = state.components.findIndex(
        (comp) => comp.id === component.id
      );
      if (index <= 0) return { ...state }; // Already at the front or not found

      const newComponents = [...state.components];
      const [movedComponent] = newComponents.splice(index, 1);
      newComponents.unshift(movedComponent);

      return { components: newComponents };
    }),

  sendBackward: (component: AllComponents) =>
    set((state) => {
      const index = state.components.findIndex(
        (comp) => comp.id === component.id
      );
      if (index === -1 || index === state.components.length - 1)
        return { ...state }; // Already at the back or not found

      const newComponents = [...state.components];
      [newComponents[index + 1], newComponents[index]] = [
        newComponents[index],
        newComponents[index + 1],
      ];

      return { components: newComponents };
    }),

  sendToBack: (component: AllComponents) =>
    set((state) => {
      const index = state.components.findIndex(
        (comp) => comp.id === component.id
      );
      if (index === -1 || index === state.components.length - 1)
        return { ...state }; // Already at the back or not found

      const newComponents = [...state.components];
      const [movedComponent] = newComponents.splice(index, 1);
      newComponents.push(movedComponent);

      return { components: newComponents };
    }),

  align: (commandType: CommandType) => {
    set((state) => {
      if (!state.selectedComponents.length) return state;

      switch (commandType) {
        case CommandType.AlignLeft: {
          const minX = Math.min(...state.selectedComponents.map((c) => c.x));
          return {
            components: state.components.map((comp) =>
              state.selectedComponents.some((sel) => sel.id === comp.id)
                ? { ...comp, x: minX }
                : comp
            ),
          };
        }
        case CommandType.AlignCenter: {
          const averageCenterX =
            state.selectedComponents.reduce(
              (acc, c) => acc + c.x + c.width / 2,
              0
            ) / state.selectedComponents.length;
          return {
            components: state.components.map((comp) =>
              state.selectedComponents.some((sel) => sel.id === comp.id)
                ? { ...comp, x: averageCenterX - comp.width / 2 }
                : comp
            ),
          };
        }
        case CommandType.AlignRight: {
          const maxX = Math.max(
            ...state.selectedComponents.map((c) => c.x + c.width)
          );
          return {
            components: state.components.map((comp) =>
              state.selectedComponents.some((sel) => sel.id === comp.id)
                ? { ...comp, x: maxX - comp.width }
                : comp
            ),
          };
        }
        case CommandType.AlignTop: {
          const minY = Math.min(...state.selectedComponents.map((c) => c.y));
          return {
            components: state.components.map((comp) =>
              state.selectedComponents.some((sel) => sel.id === comp.id)
                ? { ...comp, y: minY }
                : comp
            ),
          };
        }
        case CommandType.AlignMiddle: {
          const averageCenterY =
            state.selectedComponents.reduce(
              (acc, c) => acc + c.y + c.height / 2,
              0
            ) / state.selectedComponents.length;
          return {
            components: state.components.map((comp) =>
              state.selectedComponents.some((sel) => sel.id === comp.id)
                ? { ...comp, y: averageCenterY - comp.height / 2 }
                : comp
            ),
          };
        }
        case CommandType.AlignBottom: {
          const maxY = Math.max(
            ...state.selectedComponents.map((c) => c.y + c.height)
          );
          console.log(state.selectedComponents.map((c) => c.y));
          console.log(state.selectedComponents.map((c) => c.height));
          console.log(maxY);
          return {
            components: state.components.map((comp) =>
              state.selectedComponents.some((sel) => sel.id === comp.id)
                ? { ...comp, y: maxY - comp.height }
                : comp
            ),
          };
        }
        default:
          return state;
      }
    });
  },
}));
