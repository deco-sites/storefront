// TODO: Support Preact's VNode
// deno-lint-ignore no-explicit-any
export type VNode = any;

export type Colors =
  | "Transparent"
  | "Backdrop opacity"
  | "Primary"
  | "Secondary"
  | "Tertiary"
  | "Base"
  | "Base inverted";

export type BorderRadius =
  | "None"
  | "Small"
  | "Normal"
  | "Medium"
  | "Large"
  | "Extra large"
  | "Full";

export type BorderColors =
  | "Transparent"
  | "Primary"
  | "Secondary"
  | "Tertiary"
  | "Base"
  | "Base inverted";

export type ButtonColor =
  | "Default"
  | "Primary"
  | "Secondary"
  | "Tertiary";

export interface ButtonType {
  color?: ButtonColor;
  outline?: boolean;
}

export type BorderWidth =
  | "None"
  | "1"
  | "2"
  | "4"
  | "8";

export const borderWidthClasses = {
  "None": "border-none",
  "1": "border",
  "2": "border-2",
  "4": "border-4",
  "8": "border-8",
};

export const borderRadiusClasses = {
  "None": "rounded-none",
  "Small": "rounded-sm",
  "Normal": "rounded",
  "Medium": "rounded-md",
  "Large": "rounded-lg",
  "Extra large": "rounded-3xl",
  "Full": "rounded-full",
};

export const colorClasses = {
  "Transparent": "",
  "Backdrop opacity": "backdrop-opacity-30 bg-white/40",
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Tertiary": "bg-accent text-accent-content",
  "Base": "bg-base-100 text-base-content",
  "Base inverted": "bg-base-content text-base-100",
};

export const borderColorClasses2 = {
  "Transparent": "border-transparent",
  "Primary": "border-primary",
  "Secondary": "border-secondary",
  "Tertiary": "border-accent",
  "Base": "border-base",
  "Base inverted": "border-base-content",
};
