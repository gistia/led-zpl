import { create } from "zustand";
import { AllComponents } from "./types";

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
}));
