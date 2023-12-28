import Container, { Props as ContainerProps } from "../../components/ui/Container.tsx";
import IconCardsGrid, { Props as GridProps } from "$store/components/cards/IconCardsGrid.tsx";

type Props = {
  container?: ContainerProps;
  grid?: GridProps;
}

export default function Section({ container, grid }: Props) {
  return (
    <Container {...container}>
      <IconCardsGrid {...grid} />
    </Container>
  );
}
