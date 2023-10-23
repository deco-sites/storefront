import { type Section } from "deco/blocks/section.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

/** @titleBy title */
interface Tab {
  title: string;
  section: Section;
}

export interface Props {
  selectedTab?: number;
  tabs?: Tab[];
}

const useTabIndex = (maybeIndex = 0, size: number) =>
  Math.max(Math.min(maybeIndex, size), 0);

function Section({ tabs = [], selectedTab: maybeTabIndex }: Props) {
  const tabIndex = useTabIndex(maybeTabIndex, tabs.length);
  const tab = tabs[tabIndex];

  return (
    <div class="flex flex-col gap-2 sm:gap-4">
      {tabs.length > 1 && (
        <div class="flex justify-center">
          <div class="tabs tabs-boxed">
            {tabs.map((tab, index) => (
              <button
                class={`tab tab-lg ${index === tabIndex ? "tab-active" : ""}`}
                {...usePartialSection<typeof Section>({
                  props: { selectedTab: index },
                })}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {tab && <tab.section.Component {...tab.section.props} />}
    </div>
  );
}

export default Section;
