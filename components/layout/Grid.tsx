import { Section } from "deco/blocks/section.ts";
import type { ComponentChildren } from "preact";
import { grid } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";

export interface GridMobile {
  /** @default Col */
  flow?: "Row" | "Col";
  cols?:
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
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "None";
  /** @default 8 */
  gap?: "1" | "2" | "4" | "8" | "12" | "16";
  /** @default Center */
  placeItems?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
}

export interface GridDesktop {
  /** @default Row */
  flow?: "Row" | "Col";
  cols?:
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
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "None";
  /** @default 8 */
  gap?: "1" | "2" | "4" | "8" | "12" | "16";
  /** @default Center */
  placeItems?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
}

/**
 * @title Grid
 */
export type Props = {
  children?: ComponentChildren;
  sectionChildrens?: Section[];
  mobile?: GridMobile;
  desktop?: GridDesktop;
};

function Section({ mobile, desktop, children, sectionChildrens }: Props) {
  return (
    <div
      class={clx(
        "grid",
        mobile?.gap ? grid.gap.mobile[mobile.gap] : grid.gap.mobile[8],
        mobile?.cols && grid.cols.mobile[mobile.cols],
        mobile?.flow && grid.flow.mobile[mobile.flow],
        mobile?.placeItems && grid.placeItems.mobile[mobile.placeItems],
        desktop?.gap ? grid.gap.desktop[desktop.gap] : grid.gap.desktop[8],
        desktop?.cols && grid.cols.desktop[desktop.cols],
        desktop?.flow
          ? grid.flow.desktop[desktop.flow]
          : grid.flow.desktop["Col"],
        desktop?.placeItems && grid.placeItems.desktop[desktop.placeItems],
      )}
    >
      {children}
      {sectionChildrens &&
        sectionChildrens.map((section) => (
          <section.Component {...section.props} />
        ))}
    </div>
  );
}

export default Section;
