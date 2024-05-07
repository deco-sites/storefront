import { clx } from "../../sdk/clx.ts";

/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */
interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const colors: Record<string, Record<string, string>> = {
  "azul-clara": { backgroundColor: "#87CEFA" },
  "azul-marinho": { backgroundColor: "#000080" },
  "branca": { backgroundColor: "#FFFFFF" },
  "cinza": { backgroundColor: "#808080" },
  "cinza-escura": { backgroundColor: "#A9A9A9" },
  "laranja": { backgroundColor: "#FFA500" },
  "marrom": { backgroundColor: "#A52A2A" },
  "preta": { backgroundColor: "#161616" },
  "verde-clara": { backgroundColor: "#90EE90" },
  "vermelha": { backgroundColor: "#FF0000" },
};

const variants = {
  active: "ring-base-content",
  disabled: "line-through",
  default: "ring-base-300",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder">
      <div
        class={clx(
          "h-6 w-6",
          "rounded-full",
          "ring-1 ring-offset-2",
          variants[variant],
        )}
        style={colors[content]}
      >
        <span class="uppercase">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
