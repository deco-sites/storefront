import Card, { Props as CardProps } from "../../components/cards/ImageCard.tsx";
import Layout, {
  CP as ContainerProps,
  Layout as LayoutProps,
} from "../../components/SectionLayout.tsx";

type Props = {
  items?: CardProps[];
  container?: ContainerProps;
  layoutType?: LayoutProps;
}

const ITEMS: CardProps[] = new Array(4).fill({
  label: "Placeholder",
  description: "Description placeholder",
  icon: "Deco",
});

function Section({ items = ITEMS, container, layoutType }: Props) {
  const allItems = items.length === 0 ? ITEMS : items;

  return (
    <Layout
      container={container}
      layout={layoutType}
      items={allItems.map((item) => <Card {...item} />)}
    />
  );
}

export default Section;
