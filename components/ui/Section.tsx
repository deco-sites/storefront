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
