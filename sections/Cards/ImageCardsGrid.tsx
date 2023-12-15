import Container, { Props as ContainerProps } from "../../components/ui/Container.tsx";
import ImageCardsGrid, { Props as GridProps } from "$store/components/cards/ImageCardsGrid.tsx";

type Props = {
  container?: ContainerProps;
  grid?: GridProps;
}

export default function Section({ container, grid }: Props) {
  return (
    <Container {...container}>
      <ImageCardsGrid {...grid} />
    </Container>
  );
}
