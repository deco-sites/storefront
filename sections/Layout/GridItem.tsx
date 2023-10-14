import { Section } from "deco/blocks/section.ts";
import { clx } from "../../sdk/clx.ts";
import { grid } from "../../constants.tsx";

interface Props {
  children: Section;
  layout?: {
    rowStart?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "auto";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "auto";
    };
    rowSpan?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "full";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "full";
    };
    colStart?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "auto";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "auto";
    };
    colSpan?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "full";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "full";
    };
  };
}

function GridItem({ children, layout }: Props) {
  return (
    <div class={clx(
      layout?.rowStart?.mobile && grid.rowStart.mobile[layout.rowStart.mobile],
      layout?.rowStart?.desktop && grid.rowStart.desktop[layout.rowStart.desktop],
      layout?.rowSpan?.mobile && grid.rowSpan.mobile[layout.rowSpan.mobile],
      layout?.rowSpan?.desktop && grid.rowSpan.desktop[layout.rowSpan.desktop],
      layout?.colStart?.mobile && grid.colStart.mobile[layout.colStart.mobile],
      layout?.colStart?.desktop && grid.colStart.desktop[layout.colStart.desktop],
      layout?.colSpan?.mobile && grid.colSpan.mobile[layout.colSpan.mobile],
      layout?.colSpan?.desktop && grid.colSpan.desktop[layout.colSpan.desktop],
    )}>
      <children.Component {...children.props} />
    </div>
  );
}

export default GridItem;
