import type { ComponentChildren } from "preact";
import { clx } from "../../../../sdk/clx.ts";

interface Props {
  url: string;
  rel: "next" | "prev";
  class?: string;
  children: ComponentChildren;
}

function InfiniteButton({ url, rel, class: className, children }: Props) {
  return (
    <a
      rel={rel}
      class={clx("btn btn-ghost", className)}
      hx-swap="outerHTML show:parent:top"
      hx-get={url}
    >
      <span class="inline [.htmx-request_&]:hidden">
        {children}
      </span>
      <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
    </a>
  );
}

export default InfiniteButton;
