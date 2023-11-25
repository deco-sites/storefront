import Card, { Props as CardProps } from "../../components/cards/ImageCard.tsx";
import Grid, { GridMobile, GridDesktop } from "../Layout/Grid.tsx"
import Container, { Props as ContainerProps } from "../../components/ui/Container.tsx";

type Props = {
  items?: CardProps[];
  container?: ContainerProps;
  gridMobile?: GridMobile;
  gridDesktop?: GridDesktop;
}

const ITEMS: CardProps[] = new Array(5).fill({});

function Section({ items = ITEMS, container, gridMobile, gridDesktop }: Props) {
  const allItems = items.length === 0 ? ITEMS : items;

  return (
    <Container {...container}>
      <Grid mobile={gridMobile} desktop={gridDesktop} children={allItems.map((item) => <Card {...item} />)} />
    </Container>
  );
}

export default Section;
