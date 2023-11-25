import Card, { Props as CardProps } from "../../components/cards/IconCard.tsx";
import Carousel, { Props as CarouselProps } from "../Layout/Carousel.tsx";
import Container, { Props as ContainerProps } from "../../components/ui/Container.tsx";

type Props = {
  items?: CardProps[];
  container?: ContainerProps;
  slider?: CarouselProps;
}

const ITEMS: CardProps[] = new Array(10).fill({});

function Section({ items = ITEMS, container, slider }: Props) {
  const allItems = items.length === 0 ? ITEMS : items;

  return (
    <Container {...container}>
      <Carousel {...slider} children={allItems.map((item) => <Card {...item} />)} />
    </Container>
  );
}

export default Section;
