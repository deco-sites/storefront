import Card, { Props as CardProps } from "../../components/cards/IconCard.tsx";
import Carousel, {
  Props as CarouselProps,
} from "../../components/layout/Carousel.tsx";

export interface Props {
  placeholderItems?: number;
  items?: CardProps[];
  slider?: CarouselProps;
}

export default function Section({ placeholderItems, items, slider }: Props) {
  const ITEMS: CardProps[] = new Array(placeholderItems || 10).fill({});
  const allItems = !items || items?.length === 0 ? ITEMS : items;

  return (
    <div class="py-6">
      <Carousel
        {...slider}
        children={allItems.map((item) => <Card {...item} />)}
      />
    </div>
  );
}
