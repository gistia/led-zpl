import { create } from "zustand";
import { Component } from "./types";

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 250;
const PADDING = 20;

interface Store {
  width: number;
  height: number;
  zoom: number;
  components: Component[];
  lastPosition: { x: number; y: number };
  addComponent: (component: Component) => void;
  removeComponent: (component: Component) => void;
  updateComponent: (component: Component) => void;
}

export const useStore = create<Store>((set) => ({
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  zoom: 1,
  components: [],
  lastPosition: { x: 5, y: 5 },

  addComponent: (component: Component) =>
    set((state) => {
      const { x, y } = state.lastPosition;

      const newPosition = {
        x: x + PADDING,
        y: y + PADDING,
      };

      const newComponent = {
        ...component,
        x: newPosition.x,
        y: newPosition.y,
      };

      return {
        lastPosition: newPosition,
        components: [...state.components, newComponent],
      };
    }),
  removeComponent: (component: Component) =>
    set((state) => ({
      components: state.components.filter((c) => c !== component),
    })),
  updateComponent: (component: Component) =>
    set((state) => ({
      components: state.components.map((c) =>
        c === component ? component : c
      ),
    })),
}));
