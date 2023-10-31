import Card, { Props as CardProps } from "../../components/cards/ImageCard.tsx";
import Layout, {
  Props as LayoutProps,
} from "../../components/SectionLayout.tsx";

interface Props {
  items?: CardProps[];
  layout?: Omit<LayoutProps["layout"], "children">;
  container?: LayoutProps["container"];
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
