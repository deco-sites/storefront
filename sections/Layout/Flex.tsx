import { clx } from "$store/sdk/clx.ts";
import { Section } from "deco/blocks/section.ts";
import type { ComponentChildren } from "preact";
import { flex } from "../../constants.tsx";

/**
 * @title Flex
 */
export interface Props {
  children?: ComponentChildren | null;
  sectionChildrens?: Section[];
  gap?: {
    /** @default 2 */
    mobile?: "1" | "2" | "4" | "8" | "12" | "16";
    /** @default 4 */
    desktop?: "1" | "2" | "4" | "8" | "12" | "16";
  };
  direction?: {
    /** @default Row */
    mobile?: "Row" | "Col";
    /** @default Row */
    desktop?: "Row" | "Col";
  };
  align?: {
    /** @default Center */
    mobile?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
    /** @default Center */
    desktop?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
  };
  justify?: {
    /** @default Center */
    mobile?: "Center" | "Start" | "End" | "Between";
    /** @default Center */
    desktop?: "Center" | "Start" | "End" | "Between";
  };
  wrap?: {
    /** @default Wrap */
    mobile?: "Wrap" | "Nowrap" | "Wrap-reverse";
    /** @default wrap */
    desktop?: "Wrap" | "Nowrap" | "Wrap-reverse";
  };
}

function Section(
  { gap, direction, align, justify, wrap, children, sectionChildrens }: Props,
) {
  return (
    <div
      class={clx(
        "w-full flex",
        gap?.mobile && flex.gap.mobile[gap.mobile],
        gap?.desktop && flex.gap.desktop[gap.desktop],
        direction?.mobile &&
          flex.direction.mobile[direction.mobile],
        direction?.desktop &&
          flex.direction.desktop[direction.desktop],
        align?.mobile && flex.align.mobile[align.mobile],
        align?.desktop &&
          flex.align.desktop[align.desktop],
        justify?.mobile && flex.justify.mobile[justify.mobile],
        justify?.desktop &&
          flex.justify.desktop[justify.desktop],
        wrap?.mobile && flex.wrap.mobile[wrap.mobile],
        wrap?.desktop && flex.wrap.desktop[wrap.desktop],
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
