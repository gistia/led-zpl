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
  width: number;
  height: number;
  isNew?: boolean;
  lastModified?: number;
};

export type TextComponent = Component & {
  type: ComponentType.Text;
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
};

export type ImageComponent = Component & {
  type: ComponentType.Image;
  src: string | null;
};

export type ShapeComponent = Component & {
  type: ComponentType.Shape;
  color: string;
};

export type IconComponent = Component & {
  type: ComponentType.Icon;
  icon: string;
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

export enum CommandType {
  AlignLeft = "align-left",
  AlignCenter = "align-center",
  AlignRight = "align-right",
  AlignTop = "align-top",
  AlignMiddle = "align-middle",
  AlignBottom = "align-bottom",
  BringForward = "bring-forward",
  SendBackward = "send-backward",
  BringToFront = "bring-to-front",
  SendToBack = "send-to-back",
}
