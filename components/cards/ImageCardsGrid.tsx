import Card, { Props as CardProps } from "../../components/cards/ImageCard.tsx";
import Grid, { GridMobile, GridDesktop } from "../layout/Grid.tsx"

export interface Props {
  placeholderItems?: number;
  items?: CardProps[];
  gridMobile?: GridMobile;
  gridDesktop?: GridDesktop;
}

export default function Section({ placeholderItems, items, gridMobile, gridDesktop }: Props) {
  const ITEMS: CardProps[] = new Array(placeholderItems || 5).fill({});
  const allItems = !items || items?.length === 0 ? ITEMS : items;

  return (
    <Grid mobile={gridMobile} desktop={gridDesktop} children={allItems.map((item) => <Card {...item} />)} />
  );
}