import Container, {
  Props as ContainerProps,
} from "../../components/ui/Container.tsx";
import ImageCardsCarousel, {
  Props as CarouselProps,
} from "$store/components/cards/ImageCardsCarousel.tsx";

type Props = {
  container?: ContainerProps;
  carousel?: CarouselProps;
};

export default function Section({ container, carousel }: Props) {
  return (
    <Container {...container}>
      <ImageCardsCarousel {...carousel} />
    </Container>
  );
}
