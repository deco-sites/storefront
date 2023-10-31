import { LayoutContext, useLayoutContext } from "$store/components/Layout.tsx";
import { clx } from "$store/sdk/clx.ts";
import { Section } from "deco/blocks/section.ts";
import { flex, VNode } from "../../constants.tsx";

interface Props {
  children?: VNode[] | null;
  layout?: {
    gap?: {
      /** @default 4 */
      mobile?: "1" | "2" | "4" | "8" | "12" | "16";
      /** @default 8 */
      desktop?: "1" | "2" | "4" | "8" | "12" | "16";
    };
    direction?: {
      /** @default col */
      mobile?: "row" | "col";
      /** @default row */
      desktop?: "row" | "col";
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
  const { isPreview } = useLayoutContext();
  const items = isPreview && !children?.length
    ? new Array(4).fill(0).map(() => <ItemPreview />)
    : children;

  return (
    <div
      class={clx(
        "flex",
        flex.gap.mobile[layout?.gap?.mobile ?? "4"],
        flex.gap.desktop[layout?.gap?.desktop ?? "8"],
        flex.direction.mobile[layout?.direction?.mobile ?? "col"],
        flex.direction.desktop[layout?.direction?.desktop ?? "row"],
        flex.justify.mobile[layout?.justify?.mobile ?? "center"],
        flex.justify.desktop[layout?.justify?.desktop ?? "center"],
        flex.wrap.mobile[layout?.wrap?.mobile ?? "wrap"],
        flex.wrap.desktop[layout?.wrap?.desktop ?? "wrap"],
      )}
    >
      {items}
    </div>
  );
}

export function Preview(props: Props) {
  return (
    <LayoutContext.Provider value={{ isPreview: true }}>
      <Section {...props} />
    </LayoutContext.Provider>
  );
}

const ItemPreview = () => (
  <div class="card w-48 h-48 bg-base-100 shadow">
    <div class="card-body items-center justify-center text-base-300 text-sm">
      flex
    </div>
  </div>
);

export default Section;
