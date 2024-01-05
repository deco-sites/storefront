// TODO: Support Preact's VNode
// deno-lint-ignore no-explicit-any
export type VNode = any;

export const grid = {
  gap: {
    mobile: {
      "1": "gap-1",
      "2": "gap-2",
      "4": "gap-4",
      "8": "gap-8",
      "12": "gap-12",
      "16": "gap-16",
    },
    desktop: {
      "1": "lg:gap-1",
      "2": "lg:gap-2",
      "4": "lg:gap-4",
      "8": "lg:gap-8",
      "12": "lg:gap-12",
      "16": "lg:gap-16",
    },
  },
  cols: {
    mobile: {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
      "5": "grid-cols-5",
      "6": "grid-cols-6",
      "7": "grid-cols-7",
      "8": "grid-cols-8",
      "9": "grid-cols-9",
      "10": "grid-cols-10",
      "11": "grid-cols-11",
      "12": "grid-cols-12",
      "None": "grid-cols-none",
    },
    desktop: {
      "1": "lg:grid-cols-1",
      "2": "lg:grid-cols-2",
      "3": "lg:grid-cols-3",
      "4": "lg:grid-cols-4",
      "5": "lg:grid-cols-5",
      "6": "lg:grid-cols-6",
      "7": "lg:grid-cols-7",
      "8": "lg:grid-cols-8",
      "9": "lg:grid-cols-9",
      "10": "lg:grid-cols-10",
      "11": "lg:grid-cols-11",
      "12": "lg:grid-cols-12",
      "None": "lg:grid-cols-none",
    },
  },
  rows: {
    mobile: {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
      "5": "grid-cols-5",
      "6": "grid-cols-6",
      "None": "grid-cols-none",
    },
    desktop: {
      "1": "lg:grid-cols-1",
      "2": "lg:grid-cols-2",
      "3": "lg:grid-cols-3",
      "4": "lg:grid-cols-4",
      "5": "lg:grid-cols-5",
      "6": "lg:grid-cols-6",
      "None": "lg:grid-cols-none",
    },
  },
  flow: {
    mobile: {
      "Col": "grid-flow-col",
      "Row": "grid-flow-row",
      "Dense": "grid-flow-dense",
      "Col-dense": "grid-flow-col-dense",
      "Row-dense": "grid-flow-row-dense",
    },
    desktop: {
      "Col": "lg:grid-flow-col",
      "Row": "lg:grid-flow-row",
      "Dense": "lg:grid-flow-dense",
      "Col-dense": "lg:grid-flow-col-dense",
      "Row-dense": "lg:grid-flow-row-dense",
    },
  },
  placeItems: {
    mobile: {
      "Center": "place-items-center",
      "Start": "place-items-start",
      "End": "place-items-end",
      "Baseline": "place-items-baseline",
      "Stretch": "place-items-stretch",
    },
    desktop: {
      "Center": "lg:place-items-center",
      "Start": "lg:place-items-start",
      "End": "lg:place-items-end",
      "Baseline": "lg:place-items-baseline",
      "Stretch": "lg:place-items-stretch",
    },
  },
  rowStart: {
    mobile: {
      "1": "row-start-1",
      "2": "row-start-2",
      "3": "row-start-3",
      "4": "row-start-4",
      "5": "row-start-5",
      "6": "row-start-6",
      "7": "row-start-7",
      "Auto": "row-start-auto",
    },
    desktop: {
      "1": "lg:row-start-1",
      "2": "lg:row-start-2",
      "3": "lg:row-start-3",
      "4": "lg:row-start-4",
      "5": "lg:row-start-5",
      "6": "lg:row-start-6",
      "7": "lg:row-start-7",
      "Auto": "lg:row-start-auto",
    },
  },
  rowSpan: {
    mobile: {
      "1": "row-span-1",
      "2": "row-span-2",
      "3": "row-span-3",
      "4": "row-span-4",
      "5": "row-span-5",
      "6": "row-span-6",
      "Full": "row-span-full",
    },
    desktop: {
      "1": "lg:row-span-1",
      "2": "lg:row-span-2",
      "3": "lg:row-span-3",
      "4": "lg:row-span-4",
      "5": "lg:row-span-5",
      "6": "lg:row-span-6",
      "Full": "lg:row-span-full",
    },
  },
  colStart: {
    mobile: {
      "1": "col-start-1",
      "2": "col-start-2",
      "3": "col-start-3",
      "4": "col-start-4",
      "5": "col-start-5",
      "6": "col-start-6",
      "7": "col-start-7",
      "Auto": "col-start-auto",
    },
    desktop: {
      "1": "lg:col-start-1",
      "2": "lg:col-start-2",
      "3": "lg:col-start-3",
      "4": "lg:col-start-4",
      "5": "lg:col-start-5",
      "6": "lg:col-start-6",
      "7": "lg:col-start-7",
      "Auto": "lg:col-start-auto",
    },
  },
  colSpan: {
    mobile: {
      "1": "col-span-1",
      "2": "col-span-2",
      "3": "col-span-3",
      "4": "col-span-4",
      "5": "col-span-5",
      "6": "col-span-6",
      "Full": "col-span-full",
    },
    desktop: {
      "1": "lg:col-span-1",
      "2": "lg:col-span-2",
      "3": "lg:col-span-3",
      "4": "lg:col-span-4",
      "5": "lg:col-span-5",
      "6": "lg:col-span-6",
      "Full": "lg:col-span-full",
    },
  },
};

export const divide = {
  axis: {
    mobile: {
      "x": "divide-x",
      "y": "divide-y",
    },
    desktop: {
      "x": "lg:divide-x",
      "y": "lg:divide-y",
    },
  },
  size: {
    mobile: {
      "0": "divide-0",
      "2": "divide-2",
      "4": "divide-4",
      "8": "divide-8",
    },
    desktop: {
      "0": "lg:divide-0",
      "2": "lg:divide-2",
      "4": "lg:divide-4",
      "8": "lg:divide-8",
    },
  },
};

export const flex = {
  gap: {
    mobile: {
      "1": "gap-1",
      "2": "gap-2",
      "4": "gap-4",
      "8": "gap-8",
      "12": "gap-12",
      "16": "gap-16",
    },
    desktop: {
      "1": "lg:gap-1",
      "2": "lg:gap-2",
      "4": "lg:gap-4",
      "8": "lg:gap-8",
      "12": "lg:gap-12",
      "16": "lg:gap-16",
    },
  },
  direction: {
    mobile: {
      "Row": "flex-row",
      "Col": "flex-col",
    },
    desktop: {
      "Row": "lg:flex-row",
      "Col": "lg:flex-col",
    },
  },
  justify: {
    mobile: {
      "Start": "justify-start",
      "Center": "justify-center",
      "End": "justify-end",
      "Between": "justify-between",
    },
    desktop: {
      "Start": "lg:justify-start",
      "Center": "lg:justify-center",
      "End": "lg:justify-end",
      "Between": "lg:justify-between",
    },
  },
  align: {
    mobile: {
      "Start": "items-start",
      "Center": "items-center",
      "End": "items-end",
      "Baseline": "items-baseline",
      "Stretch": "items-stretch",
    },
    desktop: {
      "Start": "lg:items-start",
      "Center": "lg:items-center",
      "End": "lg:items-end",
      "Baseline": "lg:items-baseline",
      "Stretch": "lg:items-stretch",
    },
  },
  wrap: {
    mobile: {
      "Wrap": "flex-wrap",
      "Nowrap": "flex-nowrap",
      "Wrap-reverse": "flex-wrap-reverse",
    },
    desktop: {
      "Wrap": "lg:flex-wrap",
      "Nowrap": "lg:flex-nowrap",
      "Wrap-reverse": "flex-wrap-reverse",
    },
  },
  item: {
    mobile: {
      "1": "flex-1",
      "Auto": "flex-auto",
      "Initial": "flex-inicial",
      "None": "flex-none",
    },
    desktop: {
      "1": "lg:flex-1",
      "Auto": "lg:flex-auto",
      "Initial": "lg:flex-inicial",
      "None": "lg:flex-none",
    },
  },
  position: {
    "Left": "",
    "Right": "lg:flex-row-reverse",
  },
};

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

export type Shadow =
  | "None"
  | "Small"
  | "Normal"
  | "Medium"
  | "Large"
  | "Extra large";

export type TextColors =
  | "Auto"
  | "Primary"
  | "Secondary"
  | "Tertiary"
  | "Base"
  | "Base inverted";

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

export const shadowClasses = {
  "None": "drop-shadow-none",
  "Small": "drop-shadow-sm",
  "Normal": "drop-shadow",
  "Medium": "drop-shadow-md",
  "Large": "drop-shadow-lg",
  "Extra large": "drop-shadow-2xl",
};

export const layoutClasses = {
  "100%": "",
  "Contained": "lg:container",
  "2/3": "lg:mx-auto lg:w-2/3",
};

export const imgPh = {
  "sq":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
  "rct-sm":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/b0f8ca2d-9c83-48f7-88de-1a6e6d1e9eb7",
  "rct-lg":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/6fe9404a-f69c-472a-b521-78f6c1f87326",
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

export const borderColorClasses = {
  "Transparent": "",
  "Backdrop opacity": "border-base-100",
  "Primary": "border-primary-content",
  "Secondary": "border-secondary-content",
  "Tertiary": "border-accent-content",
  "Base": "border-base-content",
  "Base inverted": "border-base-100",
};

export const borderColorClasses2 = {
  "Transparent": "border-transparent",
  "Primary": "border-primary",
  "Secondary": "border-secondary",
  "Tertiary": "border-accent",
  "Base": "border-base",
  "Base inverted": "border-base-content",
};

export const lineColorClasses = {
  "Auto": "",
  "Primary": "border-primary",
  "Secondary": "border-secondary",
  "Tertiary": "border-accent",
  "Base": "border-base",
  "Base inverted": "border-base-content",
};

export const textColorClasses = {
  "Auto": "",
  "Primary": "text-primary",
  "Secondary": "text-secondary",
  "Tertiary": "text-accent",
  "Base": "text-base-100",
  "Base inverted": "text-base-content",
};

export const buttonClasses = {
  "Default": "",
  "Primary": "btn-primary",
  "Secondary": "btn-secondary",
  "Tertiary": "btn-accent",
};

export function getButtonClasses(style: ButtonType) {
  const allButtonClasses = `btn ${buttonClasses[style?.color || "Default"]} ${
    style?.outline ? "btn-outline" : ""
  }`;

  return allButtonClasses;
}
