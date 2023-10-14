import { clx } from "$store/sdk/clx.ts";
import { Section } from "deco/blocks/section.ts";
import { flex, VNode } from "../../constants.tsx";

interface Props {
  children: VNode[] | null;
  layout?: {
    gap?: {
      /** @default 2 */
      mobile?: "1" | "2" | "4" | "8" | "12" | "16";
      /** @default 4 */
      desktop?: "1" | "2" | "4" | "8" | "12" | "16";
    };
    direction?: {
      /** @default row */
      mobile?: "col" | "row";
      /** @default row */
      desktop?: "col" | "row";
    };
    justify?: {
      /** @default center */
      mobile?: "center" | "start" | "end";
      /** @default center */
      desktop?: "center" | "start" | "end";
    };
    wrap?: {
      /** @default wrap */
      mobile?: "wrap" | "nowrap" | "wrap-reverse";
      /** @default wrap */
      desktop?: "wrap" | "nowrap" | "wrap-reverse";
    };
  };
}

function Section({ layout, children }: Props) {
  return (
    <div
      class={clx(
        "flex",
        layout?.gap?.mobile && flex.gap.mobile[layout.gap.mobile],
        layout?.gap?.desktop && flex.gap.desktop[layout.gap.desktop],
        layout?.direction?.mobile &&
          flex.direction.mobile[layout.direction.mobile],
        layout?.direction?.desktop &&
          flex.direction.desktop[layout.direction.desktop],
        layout?.justify?.mobile && flex.justify.mobile[layout.justify.mobile],
        layout?.justify?.desktop &&
          flex.justify.desktop[layout.justify.desktop],
        layout?.wrap?.mobile && flex.wrap.mobile[layout.wrap.mobile],
        layout?.wrap?.desktop && flex.wrap.desktop[layout.wrap.desktop],
      )}
    >
      {children}
    </div>
  );
}

export default Section;
