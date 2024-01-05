import SimpleImage, {
  Props as SimpleImageProps,
} from "../../components/ui/SimpleImage.tsx";
import Container, {
  Props as ContainerProps,
} from "../../components/ui/Container.tsx";
import IconCardsGrid, {
  Props as GridProps,
} from "$store/components/cards/IconCardsGrid.tsx";
import { clx } from "../../sdk/clx.ts";
import { flex } from "../../constants.tsx";

export interface Props {
  container?: ContainerProps;
  image?: SimpleImageProps;
  grid?: GridProps;
}

export default function Section({
  image = {
    width: "30%",
  },
  container,
  grid,
}: Props) {
  return (
    <Container {...container}>
      <div
        class={clx(
          "flex flex-col lg:flex-row gap-8",
          image.position
            ? flex.position[image.position]
            : flex.position["Left"],
        )}
      >
        <SimpleImage width={image.width || "30%"} {...image} />
        <div class="flex-auto">
          <IconCardsGrid placeholderItems={3} {...grid} />
        </div>
      </div>
    </Container>
  );
}
