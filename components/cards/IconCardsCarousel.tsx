import Card, { Props as CardProps } from "$store/components/cards/IconCard.tsx";
import Carousel, {
  Props as CarouselProps,
} from "$store/components/layout/Carousel.tsx";

export interface Props {
  placeholderItems?: number;
  items?: CardProps[];
  slider?: CarouselProps;
}

export default function Section({ placeholderItems, items, slider }: Props) {
  const ITEMS: CardProps[] = new Array(placeholderItems || 10).fill({});
  const allItems = !items || items?.length === 0 ? ITEMS : items;

  return (
    <Carousel
      {...slider}
      children={allItems.map((item) => <Card {...item} />)}
    />
  );
}
