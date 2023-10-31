import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";
import Layout, {
  Props as LayoutProps,
} from "../../components/SectionLayout.tsx";
import Card, {
  Layout as CardLayout,
} from "../../components/cards/ProductCard.tsx";

interface Props {
  items?: Product[] | null;
  cardLayout?: CardLayout;
  layout?: Omit<LayoutProps["layout"], "children">;
  container?: LayoutProps["container"];
}

function Section({ items, container, layout }: Props) {
  return (
    <Layout
      container={container}
      layout={layout}
      items={items?.map((item) => (
        <Card product={item} platform={usePlatform()} />
      ))}
    />
  );
}

export default Section;
