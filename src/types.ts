export enum ComponentType {
  Text = "text",
  Barcode = "barcode",
  Image = "image",
  Shape = "shape",
  Icon = "icon",
}

export type Component = {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  isNew?: boolean;
  lastModified?: number;
};

export type TextComponent = Component & {
  type: ComponentType.Text;
  width: number;
  height: number;
  text: string;
  fontSize: number;
};

export type BarcodeComponent = Component & {
  type: ComponentType.Barcode;
  value: string;
  barcodeType:
    | "CODE39"
    | "CODE128"
    | "EAN13"
    | "ITF14"
    | "MSI"
    | "pharmacode"
    | "codabar"
    | "upc";
  width: number;
  height: number;
};

export type ImageComponent = Component & {
  type: ComponentType.Image;
  src: string | null;
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
