import Card, { Props as CardProps } from "../../components/cards/IconCard.tsx";
import Layout, {
  CP as ContainerProps,
  Layout as LayoutProps,
} from "../../components/SectionLayout.tsx";

interface Props {
  items?: CardProps[];
  layout?: LayoutProps;
  container?: ContainerProps;
}

const ITEMS: CardProps[] = new Array(4).fill({
  label: "Placeholder",
  description: "Description placeholder",
  icon: "Deco",
});

function Section({ items = ITEMS, layout, container }: Props) {
  const allItems = items.length === 0 ? ITEMS : items;

  return (
    <Layout
      container={container}
      layout={layout}
      items={allItems.map((item) => <Card {...item} />)}
    />
  );
}

export default Section;
