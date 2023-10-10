import { VNode } from "../../constants.tsx";
import { clx } from "$store/sdk/clx.ts";
import { toChildArray } from "preact";

interface Props {
  children: VNode[] | null;
  layout?: {
    /** @default 4 */
    gap: "1" | "2" | "4" | "8" | "12" | "16";
    columns?: {
      /** @default Auto */
      mobile?: "Auto" | "1" | "2";
      /** @default Auto */
      desktop?: "Auto" | "1" | "2" | "4" | "6" | "8";
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

const COLUMNS = {
  mobile: {
    "Auto": "grid-flow-col",
    1: "grid-cols-1",
    2: "grid-cols-2",
  },
  desktop: {
    "Auto": "lg:grid-flow-col",
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-2",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-4",
    6: "lg:grid-cols-6",
    7: "lg:grid-cols-8",
    8: "lg:grid-cols-8",
  },
};

function Section({ layout, children }: Props) {
  const items = toChildArray(children);

  return (
    <div
      class={clx(
        "grid place-items-center",
        GAP[layout?.gap ?? 4],
        COLUMNS.mobile[layout?.columns?.mobile ?? "Auto"],
        COLUMNS.desktop[layout?.columns?.desktop ?? "Auto"],
        layout?.columns?.mobile === "Auto" && "lg:grid-flow-dense",
      )}
    >
      {items}
    </div>
  );
}

export default Section;
