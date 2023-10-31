import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";
import Layout, {
  CP as ContainerProps,
  Layout as LayoutProps,
} from "../../components/SectionLayout.tsx";
import Card, {
  Layout as CardLayout,
} from "../../components/cards/ProductCard.tsx";

type Props = {
  items?: Product[] | null;
  cardLayout?: CardLayout;
  container?: ContainerProps;
} & LayoutProps;

function Section({ items, container, ...rest }: Props) {
  return (
    <Layout
      container={container}
      layout={{ ...rest }}
      items={items?.map((item) => (
        <Card product={item} platform={usePlatform()} />
      ))}
    />
  );
}

export default Section;