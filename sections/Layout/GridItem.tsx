import { Section } from "deco/blocks/section.ts";
import { clx } from "../../sdk/clx.ts";
import { grid } from "../../constants.tsx";

interface Props {
  children?: Section;
  layout?: {
    rowStart?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "Auto";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "Auto";
    };
    rowSpan?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "Full";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "Full";
    };
    colStart?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "Auto";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "Auto";
    };
    colSpan?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "Full";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "Full";
    };
  };
}

function GridItem({ children, layout }: Props) {
  return (
    <div
      class={clx(
        layout?.rowStart?.mobile &&
          grid.rowStart.mobile[layout.rowStart.mobile],
        layout?.rowStart?.desktop &&
          grid.rowStart.desktop[layout.rowStart.desktop],
        layout?.rowSpan?.mobile && grid.rowSpan.mobile[layout.rowSpan.mobile],
        layout?.rowSpan?.desktop &&
          grid.rowSpan.desktop[layout.rowSpan.desktop],
        layout?.colStart?.mobile &&
          grid.colStart.mobile[layout.colStart.mobile],
        layout?.colStart?.desktop &&
          grid.colStart.desktop[layout.colStart.desktop],
        layout?.colSpan?.mobile && grid.colSpan.mobile[layout.colSpan.mobile],
        layout?.colSpan?.desktop &&
          grid.colSpan.desktop[layout.colSpan.desktop],
      )}
    >
      {children && <children.Component {...children.props} />}
    </div>
  );
}

export default GridItem;
