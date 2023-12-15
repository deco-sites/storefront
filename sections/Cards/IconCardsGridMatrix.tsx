import Container, { Props as ContainerProps } from "../../components/ui/Container.tsx";
import IconCardsGrid, { Props as GridProps } from "$store/components/cards/IconCardsGrid.tsx";
import { type Section } from "deco/blocks/section.ts";

export interface Props {
  container?: ContainerProps;
  selectedTab?: number;
  lines?: GridProps[];
}

const useTabIndex = (maybeIndex = 0, size: number) =>
  Math.max(Math.min(maybeIndex, size), 0);

function Section({ container, lines = [], selectedTab: maybeTabIndex }: Props) {
  const ITEMS: GridProps[] = new Array(3).fill({});
  const allLines = !lines || lines?.length === 0 ? ITEMS : lines;

  return (
    <Container {...container}>
      <div class="flex flex-col gap-2 sm:gap-8">
        {allLines.length > 1 && (
          <>
            {allLines.map((line) => (
              <IconCardsGrid {...line} />
            ))}
          </>
        )}
      </div>
    </Container>
  );
}

export default Section;
