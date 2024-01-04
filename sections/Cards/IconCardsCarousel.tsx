import Container, {
  Props as ContainerProps,
} from "../../components/ui/Container.tsx";
import IconCardsCarousel, {
  Props as CarouselProps,
} from "$store/components/cards/IconCardsCarousel.tsx";

type Props = {
  container?: ContainerProps;
  carousel?: CarouselProps;
};

export default function Section({ container, carousel }: Props) {
  return (
    <Container {...container}>
      <IconCardsCarousel {...carousel} />
    </Container>
  );
}
