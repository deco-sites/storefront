import { useSection } from "deco/hooks/useSection.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  /** @description Section title */
  title?: string;

  /** @description See all link */
  cta?: string;
}

function Header({ title, cta }: Props) {
  if (!title) {
    return null;
  }

  return (
    <div
      class={clx(
        "flex justify-between items-center gap-2",
        "px-5 sm:px-0",
      )}
    >
      <span class="text-2xl sm:text-3xl font-semibold">{title}</span>
      {cta && (
        <a class="text-sm font-medium text-primary" href={cta}>
          See all
        </a>
      )}
    </div>
  );
}

interface Tab {
  title: string;
}

function Tabbed(
  { tabs, current = 0, children }: {
    tabs: Tab[];
    /** @description Current tab index. Defaults to 0 */
    current?: number;
    children: JSX.Element;
  },
) {
  const id = useId();

  return (
    <>
      <div class="flex px-5 sm:px-0 gap-3">
        <div role="tablist" class="tabs gap-3">
          {tabs.map((tab, index) => (
            <button
              role="tab"
              class={clx(
                "tab tab-lg rounded-full",
                index === current
                  ? "tab-active bg-primary bg-opacity-15"
                  : "bg-base-200",
                "gap-2",
              )}
              hx-get={useSection({ props: { tabIndex: index } })}
              hx-swap="outerHTML"
              hx-target="closest section"
              hx-indicator={`#${id}`}
            >
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        <span
          id={id}
          class="[.htmx-request&]:inline hidden loading loading-spinner loading-xs"
        />
      </div>

      {children}
    </>
  );
}

function Container({ class: _class, ...props }: JSX.IntrinsicElements["div"]) {
  return (
    <div
      {...props}
      class={clx(
        "container flex flex-col gap-4 sm:gap-6 w-full py-5 sm:py-10",
        _class?.toString(),
      )}
    />
  );
}

function Section() {}

Section.Container = Container;
Section.Header = Header;
Section.Tabbed = Tabbed;

export default Section;
