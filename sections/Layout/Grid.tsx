import { Section } from "deco/blocks/section.ts";
import type { ComponentChildren } from "preact";
import { grid } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";

/**
 * @title Grid
 */
export interface Props {
  children?: ComponentChildren;
  gap?: {
    /** @default 2 */
    mobile?: "1" | "2" | "4" | "8" | "12" | "16";
    /** @default 4 */
    desktop?: "1" | "2" | "4" | "8" | "12" | "16";
  };
  cols?: {
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
      | "None";
    desktop?:
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
      | "None";
  };
  rows?: {
    mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "None";
    desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "None";
  };
  flow?: {
    /** @default Row */
    mobile?: "Row" | "Col" | "Dense" | "Col-dense" | "Row-dense";
    /** @default Row */
    desktop?: "Row" | "Col" | "Dense" | "Col-dense" | "Row-dense";
  };
  placeItems?: {
    /** @default Center */
    mobile?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
    /** @default Center */
    desktop?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
  };
}

function Section({ gap, cols, rows, flow, placeItems, children }: Props) {
  return (
    <div
      class={clx(
        "w-full grid",
        gap?.mobile && grid.gap.mobile[gap.mobile],
        gap?.desktop && grid.gap.desktop[gap.desktop],
        cols?.mobile && grid.cols.mobile[cols.mobile],
        cols?.desktop && grid.cols.desktop[cols.desktop],
        flow?.mobile && grid.flow.mobile[flow.mobile],
        flow?.desktop && grid.flow.desktop[flow.desktop],
        placeItems?.mobile &&
          grid.placeItems.mobile[placeItems.mobile],
        placeItems?.desktop &&
          grid.placeItems.desktop[placeItems.desktop],
      )}
    >
      {children}
    </div>
  );
}

export default Section;
