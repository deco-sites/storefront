import Container, {
  Props as ContainerProps,
} from "$store/components/ui/Container.tsx";
import IconCardsCarousel, {
  Props as CarouselProps,
} from "$store/components/cards/IconCardsCarousel.tsx";

export interface Props {
  container?: ContainerProps;
  carousel?: CarouselProps;
}

export default function IconCardsCarouselSection(
  { container, carousel }: Props,
) {
  return (
    <Container {...container}>
      <IconCardsCarousel {...carousel} />
    </Container>
  );
}
