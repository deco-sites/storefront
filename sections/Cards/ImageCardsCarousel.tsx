import ImageCardsCarousel, {
  Props as CarouselProps,
} from "$store/components/cards/ImageCardsCarousel.tsx";

type Props = {
  carousel?: CarouselProps;
};

export default function Section({ carousel }: Props) {
  return <ImageCardsCarousel {...carousel} />;
}
