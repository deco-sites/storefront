/**
 * Theme generator inspired by Daisy UI:
 * Copyright (c) 2020 Pouya Saadeghi
 * License: MIT (https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/LICENSE)
 * https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/src/docs/src/routes/theme-generator.svelte
 */
import SiteTheme, { Font } from "apps/website/components/Theme.tsx";
import Color from "npm:colorjs.io";

export interface ThemeColors {
  /**
   * @format color
   * @title Base
   */
  "base-100"?: string;
  /** @format color */
  "primary"?: string;
  /** @format color */
  "secondary"?: string;
  /**
   * @title Accent
   * @format color */
  "tertiary"?: string;
  /** @format color */
  "neutral"?: string;
  /** @format color */
  "success"?: string;
  /** @format color */
  "warning"?: string;
  /** @format color */
  "error"?: string;
  /** @format color */
  "info"?: string;
}

export interface ComplementaryColors {
  /** @format color */
  "base-200"?: string;
  /** @format color */
  "base-300"?: string;
  /** @format color */
  "base-content"?: string;
  /** @format color */
  "primary-content"?: string;
  /** @format color */
  "secondary-content"?: string;
  /**
   * @title Accent Content
   * @format color */
  "tertiary-content"?: string;
  /** @format color */
  "neutral-content"?: string;
  /** @format color */
  "success-content"?: string;
  /** @format color */
  "warning-content"?: string;
  /** @format color */
  "error-content"?: string;
  /** @format color */
  "info-content"?: string;
}

export interface Button {
  /**
   * @default 1px
   * @title Border width
   */
  "--border-btn": "1px" | "2px" | "3px" | "4px" | "5px" | "6px" | "7px" | "8px";
  /**
   * @default 0.2rem
   * @title Radius
   * @description Button and similar elements
   */
  "--rounded-btn": "0" | "0.2rem" | "0.4rem" | "0.8rem" | "2rem";
  /**
   * @default 0.95
   * @title Scale on click
   */
  "--btn-focus-scale": "0.9" | "0.95" | "1" | "1.05" | "1.1";
  /**
   * @default 0.25s
   * @title Animation
   * @description Duration when you click
   */
  "--animation-btn": "0.1s" | "0.15s" | "0.2s" | "0.25s" | "0.3s" | "0.35s";
}

export interface Miscellaneous {
  /**
   * @default 1rem
   * @title Rounded box
   * @description border radius rounded-box utility class, used in card and other large boxes
   */
  "--rounded-box": string;
  /**
   * @default 1.9rem
   * @title Rounded badge
   * @description border radius rounded-badge utility class, used in badges and similar
   */
  "--rounded-badge": string;
  /**
   * @default 0.2s
   * @title Animation input
   * @description duration of animation for inputs like checkbox, toggle, radio, etc
   */
  "--animation-input": string;
  /**
   * @default 1px
   * @title Tab border
   * @description border width of tabs
   */
  "--tab-border": string;
  /**
   * @default 0.5rem
   * @title Tab radius
   * @description border radius of tabs
   */
  "--tab-radius": string;
}

export interface Props {
  /**
   * @description Set the prefers-color-scheme media query. To support dark mode, create two instances of this block and set this option to light/dark in each instance
   * @default light
   */
  colorScheme?: "light" | "dark";
  mainColors?: ThemeColors;
  /** @description These will be auto-generated to a readable color if not set */
  complementaryColors?: ComplementaryColors;
  buttonStyle?: Button;
  otherStyles?: Miscellaneous;
  font?: Font;
}

type Theme =
  & ThemeColors
  & ComplementaryColors
  & Button
  & Miscellaneous;

const darken = (color: string, percentage: number) =>
  new Color(color).darken(percentage);

const isDark = (c: Color) =>
  c.contrast("black", "WCAG21") < c.contrast("white", "WCAG21");

const contrasted = (color: string, percentage = 0.8) => {
  const c = new Color(color);

  return isDark(c) ? c.mix("white", percentage) : c.mix("black", percentage);
};

const toVariables = (
  t: Theme & Required<ThemeColors>,
): [string, string][] => {
  const toValue = (color: string | ReturnType<typeof darken>) => {
    const [l, c, h] = new Color(color).oklch;

    return `${(l * 100).toFixed(0)}% ${c.toFixed(2)} ${(h || 0).toFixed(0)}deg`;
  };

  const colorVariables = Object.entries({
    "--p": t["primary"],
    "--pc": t["primary-content"] ?? contrasted(t["primary"]),

    "--s": t["secondary"],
    "--sc": t["secondary-content"] ?? contrasted(t["secondary"]),

    "--a": t["tertiary"],
    "--ac": t["tertiary-content"] ?? contrasted(t["tertiary"]),

    "--n": t["neutral"],
    "--nc": t["neutral-content"] ?? contrasted(t["neutral"]),

    "--b1": t["base-100"],
    "--b2": t["base-200"] ?? darken(t["base-100"], 0.07),
    "--b3": t["base-300"] ?? darken(t["base-100"], 0.14),
    "--bc": t["base-content"] ?? contrasted(t["base-100"]),

    "--su": t["success"],
    "--suc": t["success-content"] ?? contrasted(t["success"]),

    "--wa": t["warning"],
    "--wac": t["warning-content"] ?? contrasted(t["warning"]),

    "--er": t["error"],
    "--erc": t["error-content"] ?? contrasted(t["error"]),

    "--in": t["info"],
    "--inc": t["info-content"] ?? contrasted(t["info"]),
  }).map(([key, color]) => [key, toValue(color)] as [string, string]);

  const miscellaneousVariables = Object.entries({
    "--rounded-box": t["--rounded-box"],
    "--rounded-btn": t["--rounded-btn"],
    "--rounded-badge": t["--rounded-badge"],
    "--animation-btn": t["--animation-btn"],
    "--animation-input": t["--animation-input"],
    "--btn-focus-scale": t["--btn-focus-scale"],
    "--border-btn": t["--border-btn"],
    "--tab-border": t["--tab-border"],
    "--tab-radius": t["--tab-radius"],
  });

  return [...colorVariables, ...miscellaneousVariables];
};

const defaultTheme = {
  "primary": "oklch(1 0 0)",
  "secondary": "oklch(1 0 0)",
  "tertiary": "oklch(1 0 0)",
  "neutral": "oklch(1 0 0)",
  "base-100": "oklch(1 0 0)",
  "info": "oklch(1 0 0)",
  "success": "oklch(0.9054 0.1546 194.7689)",
  "warning": "oklch(1 0 0)",
  "error": "oklch(1 0 0)",

  "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
  "--rounded-btn": "0.2rem" as const, // border radius rounded-btn utility class, used in buttons and similar element
  "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
  "--animation-btn": "0.25s" as const, // duration of animation when you click on button
  "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
  "--btn-focus-scale": "0.95" as const, // scale transform of button when you focus on it
  "--border-btn": "1px" as const, // border width of buttons
  "--tab-border": "1px", // border width of tabs
  "--tab-radius": "0.5rem", // border radius of tabs
};

/**
 * This section merges the DESIGN_SYTEM variable with incoming props into a css sheet with variables, i.e.
 * this function transforms props into
 *
 * :root {
 *   --color-primary: #FFFFFF;
 *   --color-secondary: "#161616"
 * }
 */
function Section({
  mainColors,
  complementaryColors,
  buttonStyle,
  otherStyles,
  font,
  colorScheme,
}: Props) {
  const theme = {
    ...defaultTheme,
    ...complementaryColors,
    ...mainColors,
    ...buttonStyle,
    ...otherStyles,
  };

  const variables = [
    ...toVariables(theme),
    [
      "--font-family",
      font?.family ||
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    ],
  ]
    .map(([name, value]) => ({ name, value }));

  return (
    <SiteTheme
      fonts={font ? [font] : undefined}
      variables={variables}
      colorScheme={colorScheme}
    />
  );
}

export function Preview(props: Props) {
  return (
    <>
      <Section {...props} />
      <div class="grid grid-flow-row md:grid-flow-col">
        <div class="flex flex-col gap-4 p-4 bg-base-100 text-base-content">
          <div class="text-xl">The quick brown fox jumps over the lazy dog</div>
          {" "}
          <button class="btn">Default button</button>{" "}
          <div class="flex flex-col gap-1">
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm">A</button>{" "}
              <button class="btn btn-sm btn-primary">A</button>{" "}
              <button class="btn btn-sm btn-secondary">A</button>{" "}
              <button class="btn btn-sm btn-accent">A</button>
              {" "}
            </div>
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm btn-outline">A</button>{" "}
              <button class="btn btn-sm btn-primary btn-outline">A</button>{" "}
              <button class="btn btn-sm btn-secondary btn-outline">A</button>
              {" "}
              <button class="btn btn-sm btn-accent btn-outline">A</button>
              {" "}
            </div>
            {" "}
          </div>
          <div class="flex flex-col gap-2">
            <span class="badge">Base</span>{" "}
            <span class="badge badge-primary">Primary</span>{" "}
            <span class="badge badge-secondary">Secondary</span>{" "}
            <span class="badge badge-accent">Accent</span>
            {" "}
          </div>{" "}
          <div class="flex flex-col">
            <div class="text-base">Content</div>
            <div class="text-base text-primary">Primary</div>
            <div class="text-base text-secondary">Secondary</div>
            <div class="text-base text-accent">Accent</div>
          </div>
          {" "}
        </div>{" "}
        <div class="flex flex-col gap-4 p-4 bg-base-content text-base-100">
          <div class="text-xl">The quick brown fox jumps over the lazy dog</div>
          {" "}
          <button class="btn">Default button</button>{" "}
          <div class="flex flex-col gap-1">
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm">A</button>{" "}
              <button class="btn btn-sm btn-primary">A</button>{" "}
              <button class="btn btn-sm btn-secondary">A</button>{" "}
              <button class="btn btn-sm btn-accent">A</button>
              {" "}
            </div>
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm btn-primary btn-outline">A</button>{" "}
              <button class="btn btn-sm btn-secondary btn-outline">A</button>
              {" "}
              <button class="btn btn-sm btn-accent btn-outline">A</button>
              {" "}
            </div>
            {" "}
          </div>
          <div class="flex flex-col gap-2">
            <span class="badge">Base</span>{" "}
            <span class="badge badge-primary">Primary</span>{" "}
            <span class="badge badge-secondary">Secondary</span>{" "}
            <span class="badge badge-accent">Accent</span>
            {" "}
          </div>{" "}
          <div class="flex flex-col">
            <div class="text-base">Content</div>
            <div class="text-base text-primary">Primary</div>
            <div class="text-base text-secondary">Secondary</div>
            <div class="text-base text-accent">Accent</div>
          </div>
          {" "}
        </div>{" "}
        <div class="flex flex-col gap-4 p-4 bg-primary text-primary-content">
          <div class="text-xl">The quick brown fox jumps over the lazy dog</div>
          {" "}
          <button class="btn">Default button</button>{" "}
          <div class="flex flex-col gap-1">
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm">A</button>{" "}
              <button class="btn btn-sm btn-secondary">A</button>{" "}
              <button class="btn btn-sm btn-accent">A</button>
              {" "}
            </div>
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm btn-outline">A</button>{" "}
              <button class="btn btn-sm btn-secondary btn-outline">A</button>
              {" "}
              <button class="btn btn-sm btn-accent btn-outline">A</button>
              {" "}
            </div>
            {" "}
          </div>
          <div class="flex flex-col gap-2">
            <span class="badge">Base</span>{" "}
            <span class="badge badge-secondary">Secondary</span>{" "}
            <span class="badge badge-accent">Accent</span>
            {" "}
          </div>{" "}
          <div class="flex flex-col">
            <div class="text-base">Content</div>
            <div class="text-base text-secondary">Secondary</div>
            <div class="text-base text-accent">Accent</div>
          </div>
          {" "}
        </div>{" "}
        <div class="flex flex-col gap-4 p-4 bg-secondary text-secondary-content">
          <div class="text-xl">The quick brown fox jumps over the lazy dog</div>
          {" "}
          <button class="btn">Default button</button>{" "}
          <div class="flex flex-col gap-1">
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm">A</button>{" "}
              <button class="btn btn-sm btn-primary">A</button>{" "}
              <button class="btn btn-sm btn-accent">A</button>
              {" "}
            </div>
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm btn-outline">A</button>{" "}
              <button class="btn btn-sm btn-primary btn-outline">A</button>{" "}
              <button class="btn btn-sm btn-accent btn-outline">A</button>
              {" "}
            </div>
            {" "}
          </div>
          <div class="flex flex-col gap-2">
            <span class="badge">Base</span>{" "}
            <span class="badge badge-primary">Primary</span>{" "}
            <span class="badge badge-accent">Accent</span>
            {" "}
          </div>{" "}
          <div class="flex flex-col">
            <div class="text-base">Content</div>
            <div class="text-base text-primary">Primary</div>
            <div class="text-base text-accent">Accent</div>
          </div>
          {" "}
        </div>{" "}
        <div class="flex flex-col gap-4 p-4 bg-accent text-accent-content">
          <div class="text-xl">The quick brown fox jumps over the lazy dog</div>
          {" "}
          <button class="btn">Default button</button>{" "}
          <div class="flex flex-col gap-1">
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm">A</button>{" "}
              <button class="btn btn-sm btn-primary">A</button>{" "}
              <button class="btn btn-sm btn-secondary">A</button>
              {" "}
            </div>
            <div class="flex flex-wrap gap-1">
              <button class="btn btn-sm btn-outline">A</button>{" "}
              <button class="btn btn-sm btn-primary btn-outline">A</button>{" "}
              <button class="btn btn-sm btn-secondary btn-outline">A</button>
              {" "}
            </div>
            {" "}
          </div>
          <div class="flex flex-col gap-2">
            <span class="badge">Base</span>{" "}
            <span class="badge badge-primary">Primary</span>{" "}
            <span class="badge badge-secondary">Secondary</span>
            {" "}
          </div>{" "}
          <div class="flex flex-col">
            <div class="text-base">Content</div>
            <div class="text-base text-primary">Primary</div>
            <div class="text-base text-secondary">Secondary</div>
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {props.font?.family && (
        <div class="text-center py-2">
          Font: {props.font.family}
        </div>
      )}
    </>
  );
}

export default Section;
