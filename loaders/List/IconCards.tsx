import Card, { Props as CardProps } from "../../components/cards/IconCard.tsx";
import { imgPh, VNode } from "../../constants.tsx";

export interface Props {
  /** @title Items */
  items?: CardProps[];
}

const ITEMS: CardProps[] = new Array(4).fill({
  label: "Placeholder",
  image: imgPh.sq,
});

function loader({ items = ITEMS }: Props): VNode[] | null {
  return items?.map((item) => <Card {...item} />) ?? null;
}

export default loader;
