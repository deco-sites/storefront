import SimpleImage, { Props as SimpleImageProps } from "../../components/ui/SimpleImage.tsx";
import Card, { Props as CardProps } from "../../components/cards/ImageCard.tsx";
import Container, { Props as ContainerProps } from "../../components/ui/Container.tsx";
import ImageCardsCarousel, { Props as CarouselProps } from "$store/components/cards/ImageCardsCarousel.tsx";
import { clx } from "../../sdk/clx.ts";
import { flex } from "../../constants.tsx";

export interface Props {
  image?: SimpleImageProps;
  container?: ContainerProps;
  carousel?: CarouselProps;
}

export default function Section({
  image = {
    width: "30%"
  },
  container,
  carousel,
}: Props) {
  return (
    <Container {...container}>
      <div class={clx(
        "flex flex-col lg:flex-row gap-8",
        image.position ? flex.position[image.position] : flex.position["Left"],
      )}>
        <SimpleImage width={image.width || "30%"} {...image} />
        <div class="flex-auto">
          <ImageCardsCarousel {...carousel} />
        </div>
      </div>
    </Container>
  );
}
