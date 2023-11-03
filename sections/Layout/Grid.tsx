import { context } from "deco/mod.ts";
import { grid, VNode } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";

interface Props {
  children?: VNode[] | null;
  layout?: {
    gap?: {
      /** @default 2 */
      mobile?: "2" | "1" | "4" | "8" | "12" | "16";
      /** @default 4 */
      desktop?: "4" | "1" | "2" | "8" | "12" | "16";
    };
    cols?: {
      /** @default none */
      mobile?:
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "11"
        | "12"
        | "none";
      /** @default 4 */
      desktop?:
        | "4"
        | "1"
        | "2"
        | "3"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "11"
        | "12"
        | "none";
    };
    rows?: {
      /** @default none */
      mobile?: "none" | "1" | "2" | "3" | "4" | "5" | "6";
      /** @default none */
      desktop?: "none" | "1" | "2" | "3" | "4" | "5" | "6";
    };
    flow?: {
      /** @default col */
      mobile?: "col" | "row" | "dense" | "col-dense" | "row-dense";
      /** @default row */
      desktop?: "row" | "col" | "dense" | "col-dense" | "row-dense";
    };
    placeItems?: {
      /** @default center */
      mobile?: "center" | "start" | "end" | "baseline" | "stretch";
      /** @default center */
      desktop?: "center" | "start" | "end" | "baseline" | "stretch";
    };
  };
}

function Grid({ layout, children }: Props) {
  const items = !context.isDeploy && !children?.length
    ? new Array(12).fill(0).map(() => <ItemPreview />)
    : children;

  return (
    <div
      class={clx(
        "grid",
        grid.gap.mobile[layout?.gap?.mobile ?? "4"],
        grid.gap.desktop[layout?.gap?.desktop ?? "8"],
        grid.cols.mobile[layout?.cols?.mobile ?? "none"],
        grid.cols.desktop[layout?.cols?.desktop ?? "4"],
        grid.rows.mobile[layout?.rows?.mobile ?? "none"],
        grid.rows.desktop[layout?.rows?.desktop ?? "none"],
        grid.flow.mobile[layout?.flow?.mobile ?? "col"],
        grid.flow.desktop[layout?.flow?.desktop ?? "row"],
        grid.placeItems.mobile[layout?.placeItems?.mobile ?? "center"],
        grid.placeItems.desktop[layout?.placeItems?.desktop ?? "center"],
      )}
    >
      {items}
    </div>
  );
}

const ItemPreview = () => (
  <div class="card w-48 h-48 bg-base-100 shadow">
    <div class="card-body items-center justify-center text-base-300 text-sm">
      grid
    </div>
  </div>
);

export default Grid;
