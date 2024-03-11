import SimpleImage, {
  Props as SimpleImageProps,
} from "../../components/ui/SimpleImage.tsx";
import IconCardsCarousel, {
  Props as CarouselProps,
} from "../../components/cards/IconCardsCarousel.tsx";
import { clx } from "../../sdk/clx.ts";
import { flex } from "../../constants.tsx";

export interface Props {
  image?: SimpleImageProps;
  carousel?: CarouselProps;
}

export default function Section({
  image = {
    width: "30%",
  },
  carousel,
}: Props) {
  return (
    <div
      class={clx(
        "flex flex-col lg:flex-row items-center gap-8",
        image.position ? flex.position[image.position] : flex.position["Left"],
      )}
    >
      <SimpleImage width={image.width || "30%"} {...image} />
      <div class="flex-auto">
        <IconCardsCarousel placeholderItems={8} {...carousel} />
      </div>
    </div>
  );
}
