import Container, {
  Props as ContainerProps,
} from "../../components/ui/Container.tsx";
import ImageCardsGrid, {
  Props as GridProps,
} from "$store/components/cards/ImageCardsGrid.tsx";
import { type Section } from "deco/blocks/section.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

/** @titleBy title */
interface Tab {
  title?: string;
  grid?: GridProps;
}

export interface Props {
  container?: ContainerProps;
  selectedTab?: number;
  tabs?: Tab[];
}

const useTabIndex = (maybeIndex = 0, size: number) =>
  Math.max(Math.min(maybeIndex, size), 0);

function Section({ container, tabs = [], selectedTab: maybeTabIndex }: Props) {
  const ITEMS: Tab[] = new Array(3).fill({});
  const allTabs = !tabs || tabs?.length === 0 ? ITEMS : tabs;

  const tabIndex = useTabIndex(maybeTabIndex, allTabs.length);
  const tab = allTabs[tabIndex];

  return (
    <Container {...container}>
      <div class="flex flex-col gap-2 sm:gap-8">
        {allTabs.length > 1 && (
          <div class="flex justify-center">
            <div class="tabs tabs-boxed">
              {allTabs.map((tab, index) => (
                <button
                  class={`tab tab-md ${index === tabIndex ? "tab-active" : ""}`}
                  {...usePartialSection<typeof Section>({
                    props: { selectedTab: index },
                  })}
                >
                  {tab.title || "Tab"}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab && <ImageCardsGrid {...tab.grid} />}
      </div>
    </Container>
  );
}

export default Section;
