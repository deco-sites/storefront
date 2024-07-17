/**
 * Theme generator inspired by Daisy UI:
 * Copyright (c) 2020 Pouya Saadeghi
 * License: MIT (https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/LICENSE)
 * https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/src/docs/src/routes/theme-generator.svelte
 */
import SiteTheme, { Font } from "apps/website/components/Theme.tsx";
import Color from "npm:colorjs.io@0.5.2";
import type { ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";

export interface ThemeColors {
  /**
   * @format color-input
   * @title Base
   */
  "base-100"?: string;
  /** @format color-input */
  "primary"?: string;
  /** @format color-input */
  "secondary"?: string;
  /**
   * @title Accent
   * @format color-input */
  "tertiary"?: string;
  /** @format color-input */
  "neutral"?: string;
  /** @format color-input */
  "success"?: string;
  /** @format color-input */
  "warning"?: string;
  /** @format color-input */
  "error"?: string;
  /** @format color-input */
  "info"?: string;
}

export interface ComplementaryColors {
  /** @format color-input */
  "base-200"?: string;
  /** @format color-input */
  "base-300"?: string;
  /** @format color-input */
  "base-400"?: string;
  /** @format color-input */
  "base-content"?: string;
  /** @format color-input */
  "primary-content"?: string;
  /** @format color-input */
  "secondary-content"?: string;
  /**
   * @title Accent Content
   * @format color-input */
  "tertiary-content"?: string;
  /** @format color-input */
  "neutral-content"?: string;
  /** @format color-input */
  "success-content"?: string;
  /** @format color-input */
  "warning-content"?: string;
  /** @format color-input */
  "error-content"?: string;
  /** @format color-input */
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
  "--rounded-btn": "0" | "0.2rem" | "0.4rem" | "0.8rem" | "2rem" | "99999px";
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
  colorScheme?: "light" | "dark" | "any";
  mainColors?: ThemeColors;
  /** @description These will be auto-generated to a readable color if not set */
  complementaryColors?: ComplementaryColors;
  buttonStyle?: Button;
  otherStyles?: Miscellaneous;
  font?: Font;
  /**
   * @description This is the admin's color-scheme mode
   */
  mode?: "dark" | "light";
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
      colorScheme={colorScheme === "any" ? undefined : colorScheme}
    />
  );
}

export function Preview(props: Props) {
  const adminColorMode = props.mode === "dark" ? "dark" : "light";
  return (
    <>
      {
        /* This stylesheet is used to simulate the colors from the admin's color schema (admin's light or dark mode), which are not accessible in the site's color schema.
        * This is a temporary solution until the admin's color schema is accessible.
        * TODO(@carol): Change this temporary solution.
       */
      }
      <style>
        {`
          :root {
            --admin-color-dark-bg: #0d1717;
            --admin-color-light-bg: #ffffff;
            --admin-text-color-dark: #e4e7e7;
            --admin-text-color-light: #162222;
            --admin-border-color-light: #c9cfcf;
            --admin-border-color-dark: #2f3c3c;
            --admin-border-hover-color-light: #819292;
            --admin-border-hover-color-dark: #949e9e;
            --admin-hover-bg-color: #fafafa;
          }

          .dark {
            background-color: var(--admin-color-dark-bg);
            color: var(--admin-text-color-dark);
          }

          .light {
            background-color: var(--admin-color-light-bg);
            color: var(--admin-text-color-light);
          }

          .btn-outline-light, .btn-outline-dark {
            background-color: transparent;
            display: inline-flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            white-space: nowrap;
            border: 1px solid;
            border-radius: 0.5rem;
          }

          .btn-outline-light {
            color: var(--admin-text-color-light);
            border-color: var(--admin-border-color-light);
          }

          .btn-outline-dark {
            color: var(--admin-text-color-dark);
            border-color: var(--admin-border-color-dark);
          }

          .btn-outline-light:hover, .btn-outline-dark:hover {
            background-color: transparent);
            display: inline-flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            white-space: nowrap;
            border-radius: 0.5rem;
          }

          .btn-outline-light:hover {
            border-color: var(--admin-border-hover-color-light);
          }

          .btn-outline-dark:hover {
            border-color: var(--admin-border-hover-color-dark);
          }

          .border-color-dark {
            border-color: var(--admin-border-color-dark);
          }

          .border-color-light {
            border-color: var(--admin-border-color-light);
          }
        `}
      </style>
      <Section {...props} />
      <div class={`flex flex-col gap-4 text-base w-full ${adminColorMode}`}>
        <div>Components and styles</div>
        <div class="flex flex-col w-full gap-2">
          <PreviewContainer
            title="Text colors"
            mode={adminColorMode}
            codeString={snippets.textColors}
          >
            <TextColorsPreview />
          </PreviewContainer>
          <PreviewContainer
            title="Button styles"
            mode={adminColorMode}
            codeString={snippets.buttonStyles}
          >
            <ButtonStylesPreview />
          </PreviewContainer>
          <PreviewContainer
            title="Button colors"
            mode={adminColorMode}
            codeString={snippets.buttonColors}
          >
            <ButtonColorsPreview />
          </PreviewContainer>
          <PreviewContainer
            title="Button sizes"
            mode={adminColorMode}
            codeString={snippets.buttonSizes}
          >
            <ButtonSizesPreview />
          </PreviewContainer>
        </div>
      </div>
      {props.font?.family && (
        <div class="text-center py-2">
          Font: {props.font.family}
        </div>
      )}
    </>
  );
}

const ButtonSizesPreview = () => {
  const buttonSizes = {
    lg: "Large",
    md: "Normal",
    sm: "Small",
    xs: "Tiny",
  };

  const buttonStyles = ["", "primary", "secondary", "accent"];

  const renderButtonRow = (style: string) => (
    <div class="flex flex-row gap-2 items-center">
      {Object.entries(buttonSizes).map(([sizeCode, sizeText]) => (
        <button
          class={`btn capitalize btn-${sizeCode} ${
            style ? `btn-${style}` : ""
          }`}
        >
          {sizeText}
        </button>
      ))}
    </div>
  );

  return (
    <div class="bg-base-100 overflow-x-auto rounded-lg flex flex-col p-2 gap-2">
      {buttonStyles.map((style) => renderButtonRow(style))}
    </div>
  );
};

const ButtonColorsPreview = () => {
  const buttonTypesClasses = ["btn", "btn-outline", "btn-ghost", "btn-link"];
  const buttonColorsClasses = [
    "",
    "btn-primary",
    "btn-secondary",
    "btn-accent",
  ];

  const renderButtonRow = (type: string) => (
    <div class="flex flex-row gap-2">
      {buttonColorsClasses.map((color) => (
        <button class={`btn btn-xs md:btn-sm capitalize ${color} ${type}`}>
          {color ? color.split("-")[1] : "Button"}
        </button>
      ))}
    </div>
  );

  return (
    <div class="bg-base-100 overflow-x-auto rounded-lg flex flex-col p-2 gap-2">
      {buttonTypesClasses.map((type) => renderButtonRow(type))}
    </div>
  );
};

const ButtonStylesPreview = () => {
  const buttonStylesClasses = ["", "btn-outline", "btn-ghost", "btn-link"];

  return (
    <div class="bg-base-100 overflow-x-auto rounded-lg flex flex-row p-2 gap-2">
      {buttonStylesClasses.map((style) => (
        <button class={`btn btn-xs md:btn-sm capitalize ${style}`}>
          {style ? style.split("-")[1] : "Button"}
        </button>
      ))}
    </div>
  );
};

const TextColorsPreview = () => {
  const textColorsClasses = [
    "",
    "text-primary",
    "text-secondary",
    "text-accent",
  ];

  return (
    <div class="bg-base-100 overflow-x-auto rounded-lg flex flex-row p-2 gap-2 text-sm md:text-base">
      {textColorsClasses.map((color) => (
        <div class={`${color} capitalize`}>
          {color ? color.split("-")[1] : "Content"}
        </div>
      ))}
    </div>
  );
};

const PreviewContainer = (
  { mode, title, children, codeString }: {
    mode: string;
    title: string;
    children: ComponentChildren;
    codeString: string;
  },
) => {
  const borderClass = mode === "dark"
    ? "border-color-dark"
    : "border-color-light";
  const btnOutlineClass = mode === "dark"
    ? "btn-outline-dark"
    : "btn-outline-light";
  const checkboxId = `show-code-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const codeBlockId = `code-block-${title.replace(/\s+/g, "-").toLowerCase()}`;

  // Estilos dinâmicos adicionados para esconder/mostrar labels baseado no estado do checkbox
  const dynamicStyle = `
    #${codeBlockId} {
      display: none;
    }
    #${checkboxId}:checked ~ #${codeBlockId} {
      display: block;
    }
    #${checkboxId}:checked ~ .show-label {
      display: none;
    }
    #${checkboxId}:not(:checked) ~ .hide-label {
      display: none;
    }
    #${checkboxId}:checked ~ .hide-label {
      background-color: ${
    mode === "dark"
      ? "var(--admin-hover-bg-color)"
      : "var(--admin-text-color-light)"
  };
      color: ${
    mode === "dark"
      ? "var(--admin-text-color-light)"
      : "var(--admin-hover-bg-color)"
  };
    }
  `;

  return (
    <>
      <style>{dynamicStyle}</style>
      <div
        class={clx(
          `border p-4 flex flex-col gap-2 grow relative`,
          borderClass,
          `rounded-lg`,
        )}
      >
        <div>
          <div class="my-1">{title}</div>
          <div>
            <input type="checkbox" id={checkboxId} class="sr-only" />
            {/* Label for "Show code" */}
            <label
              htmlFor={checkboxId}
              class={clx(
                `btn-sm absolute right-4 top-4`,
                btnOutlineClass,
                `show-label`,
              )}
            >
              Show code
            </label>
            {/* Label for "Hide code" */}
            <label
              htmlFor={checkboxId}
              class={clx(
                `btn-sm absolute right-4 top-4`,
                btnOutlineClass,
                `hide-label`,
              )}
            >
              Hide code
            </label>
            <div
              id={codeBlockId}
              class={clx(
                "mt-4 mb-2 text-xs md:text-sm",
                mode === "dark" ? "bg-slate-800" : "bg-slate-100",
              )}
            >
              <pre class="p-4 overflow-x-auto">{codeString}</pre>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

// TODO(@carol): find a way to make these snippets more dynamic
const snippets = {
  textColors: `
  <div>Content</div>
  <div class="text-primary">Primary</div>
  <div class="text-secondary">Secondary</div>
  <div class="text-accent">Accent</div>`,
  buttonStyles: `
  <button class="btn btn-sm">Button</button>
  <button class="btn btn-sm btn-outline">Outline</button>
  <button class="btn btn-sm btn-ghost">Ghost</button>
  <button class="btn btn-sm btn-link">Link</button>`,
  buttonColors: `
  {/* First row */}
  <button class="btn btn-sm">Button</button>
  <button class="btn btn-sm btn-primary">Primary</button>
  <button class="btn btn-sm btn-secondary">Secondary</button>
  <button class="btn btn-sm btn-accent">Accent</button>

  {/* Second row */}
  <button class="btn btn-sm btn-outline">Button</button>
  <button class="btn btn-sm btn-primary btn-outline">Primary</button>
  <button class="btn btn-sm btn-secondary btn-outline">Secondary</button>
  <button class="btn btn-sm btn-accent btn-outline">Accent</button>

  {/* Third row */}
  <button class="btn btn-sm btn-ghost">Button</button>
  <button class="btn btn-sm btn-primary btn-ghost">Primary</button>
  <button class="btn btn-sm btn-secondary btn-ghost">Secondary</button>
  <button class="btn btn-sm btn-accent btn-ghost">Accent</button>

  {/* Fourth row */}
  <button class="btn btn-sm btn-link">Button</button>
  <button class="btn btn-sm btn-primary btn-link">Primary</button>
  <button class="btn btn-sm btn-secondary btn-link">Secondary</button>
  <button class="btn btn-sm btn-accent btn-link">Accent</button>`,
  buttonSizes: `
  {/* First row */}
  <button class="btn btn-lg">Large</button>
  <button class="btn btn-md">Normal</button>
  <button class="btn btn-sm">Small</button>
  <button class="btn btn-xs">Tiny</button>

  {/* Second row */}
  <button class="btn btn-lg btn-primary">Large</button>
  <button class="btn btn-md btn-primary">Normal</button>
  <button class="btn btn-sm btn-primary">Small</button>
  <button class="btn btn-xs btn-primary">Tiny</button>

  {/* Third row */}
  <button class="btn btn-lg btn-secondary">Large</button>
  <button class="btn btn-md btn-secondary">Normal</button>
  <button class="btn btn-sm btn-secondary">Small</button>
  <button class="btn btn-xs btn-secondary">Tiny</button>
  
  {/* Fourth row */}
  <button class="btn btn-lg btn-accent">Large</button>
  <button class="btn btn-md btn-accent">Normal</button>
  <button class="btn btn-sm btn-accent">Small</button>
  <button class="btn btn-xs btn-accent">Tiny</button>`,
};

export default Section;
