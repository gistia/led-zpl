export enum ComponentType {
  Text = "text",
  Barcode = "barcode",
  Image = "image",
  Shape = "shape",
  Icon = "icon",
}

export type Component = {
  type: ComponentType;
  x: number;
  y: number;
};

export type TextComponent = Component & {
  type: ComponentType.Text;
  text: string;
  fontSize: number;
};

export type BarcodeComponent = Component & {
  type: ComponentType.Barcode;
  barcode: string;
  width: number;
  height: number;
};

export type ImageComponent = Component & {
  type: ComponentType.Image;
  src: string;
  width: number;
  height: number;
};

export type ShapeComponent = Component & {
  type: ComponentType.Shape;
  width: number;
  height: number;
  color: string;
};

export type IconComponent = Component & {
  type: ComponentType.Icon;
  icon: string;
  width: number;
  height: number;
};

export type AllComponents =
  | TextComponent
  | BarcodeComponent
  | ImageComponent
  | ShapeComponent
  | IconComponent;

export type LabelDocument = {
  width: number;
  height: number;
  components: AllComponents[];
};
