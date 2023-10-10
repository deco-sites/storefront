import { VNode } from "../../constants.tsx";
import { clx } from "$store/sdk/clx.ts";
import { toChildArray } from "preact";

interface Props {
  children: VNode[] | null;
  layout?: {
    /** @default 4 */
    gap: "1" | "2" | "4" | "8" | "12" | "16";
    direction?: {
      /** @default Auto */
      mobile?: "column" | "row";
      /** @default Auto */
      desktop?: "column" | "row";
    };
    justify?: {
      /** @default center */
      mobile?: "center" | "start" | "end";
      /** @default center */
      desktop?: "center" | "start" | "end";
    };
    wrap?: {
      mobile?: boolean;
      desktop?: boolean;
    };
  };
}

const GAP = {
  1: "gap-1",
  2: "gap-2",
  4: "gap-4",
  8: "gap-8",
  12: "gap-12",
  16: "gap-16",
};

const DIRECTION = {
  mobile: { column: "flex-col", row: "flex-row" },
  desktop: { column: "sm:flex-col", row: "sm:flex-row" },
};

const JUSTIFY = {
  mobile: {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end",
  },
  desktop: {
    center: "sm:justify-center",
    start: "sm:justify-start",
    end: "sm:justify-end",
  },
};

const WRAP = {
  mobile: {
    "wrap": "flex-wrap",
    "nowrap": "flex-nowrap",
  },
  desktop: {
    "wrap": "sm:flex-wrap",
    "nowrap": "sm:flex-nowrap",
  },
};

function Section({ layout, children }: Props) {
  const items = toChildArray(children);

  return (
    <div
      class={clx(
        "flex",
        GAP[layout?.gap ?? 4],
        DIRECTION.mobile[layout?.direction?.mobile ?? "row"],
        DIRECTION.desktop[layout?.direction?.desktop ?? "row"],
        JUSTIFY.mobile[layout?.justify?.mobile ?? "center"],
        JUSTIFY.desktop[layout?.justify?.desktop ?? "center"],
        WRAP.mobile[layout?.wrap?.mobile ? "wrap" : "nowrap"],
        WRAP.desktop[layout?.wrap?.desktop ? "wrap" : "nowrap"],
      )}
    >
      {items}
    </div>
  );
}

export default Section;
