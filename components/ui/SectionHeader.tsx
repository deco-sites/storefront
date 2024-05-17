import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
}

function Header({ title, description, colorReverse, alignment }: Props) {
  if (!title && !description) {
    return null;
  }

  return (
    <div
      class={clx(
        `flex flex-col gap-2`,
        alignment === "left" ? "text-left" : "text-center",
      )}
    >
      {title && (
        <h1
          class={clx(
            "text-2xl font-light leading-8 lg:leading-10 lg:text-3xl",
            colorReverse ? "text-primary-content" : "text-base-content",
          )}
        >
          {title}
        </h1>
      )}
      {description && (
        <h2
          class={clx(
            "leading-6 font-light lg:leading-8 lg:text-2xl",
            colorReverse ? "text-primary-content" : "text-base-content",
          )}
        >
          {description}
        </h2>
      )}
    </div>
  );
}

export default Header;
