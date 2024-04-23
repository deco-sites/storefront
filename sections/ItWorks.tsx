import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  /**
   * @format rich-text
   * @description The description of name.
   * @default It Works!
   */
  name?: string;

  count?: number;
}

export default function Section({ name = "It Works!", count = 0 }: Props) {
  /**
   * usePartialSection is a nice hook for getting the HTMX link to render this section,
   * but with the following Props
   */
  const downLink = usePartialSection({ props: { count: count - 1 } });
  const upLink = usePartialSection({ props: { count: count + 1 } });

  return (
    <div
      id="it-works"
      class="container py-10 flex flex-col h-screen w-full items-center justify-center gap-16"
    >
      <div
        class="leading-10 text-6xl"
        dangerouslySetInnerHTML={{
          __html: name,
        }}
      />

      <div class="flex flex-col items-center justify-center gap-2">
        <div class="flex items-center gap-4">
          <button
            hx-target="#it-works"
            hx-swap="outerHTML"
            hx-get={downLink["f-partial"]} // htmx link for this section with the down vote props
            class="btn btn-sm btn-circle btn-outline no-animation"
          >
            <span class="inline [.htmx-request_&]:hidden">
              -
            </span>
            <span class="loading loading-spinner hidden [.htmx-request_&]:inline" />
          </button>
          <span>{count}</span>
          <button
            hx-target="#it-works"
            hx-swap="outerHTML"
            hx-get={upLink["f-partial"]} // htmx link for this section with the up vote props
            class="btn btn-sm btn-circle btn-outline no-animation"
          >
            <span class="inline [.htmx-request_&]:hidden">
              +
            </span>
            <span class="loading loading-spinner hidden [.htmx-request_&]:inline" />
          </button>
        </div>
        <div class="text-sm">Powered by HTMX</div>
      </div>
    </div>
  );
}
