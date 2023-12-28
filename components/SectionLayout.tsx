import { ComponentChildren } from "preact";
import Flex, { Props as FlexProps } from "./layout/Flex.tsx";
import Grid, { Props as GridProps } from "./layout/Grid.tsx";
import Carousel, { Props as SliderProps } from "./layout/Carousel.tsx";
import Container, { Props as ContainerProps } from "./ui/Container.tsx";

/**
 * @title Grid
 */
type GProps = GridProps & {
  display?: "grid";
};

/**
 * @title Flex
 */
type FProps = FlexProps & {
  display?: "flex";
};

/**
 * @title Slider
 */
type SProps = SliderProps & {
  display?: "carousel";
};

export type Layout = GProps | FProps | SProps;
export type CP = ContainerProps;

export interface Props {
  container?: ContainerProps;
  layout?: Layout;
  items?: ComponentChildren;
}

function SectionLayout({ container, layout, items }: Props) {
  return (
    <Container {...container}>
      <>
        {layout?.display === "grid" && <Grid {...layout} children={items} />}
        {layout?.display === "flex" && <Flex {...layout} children={items} />}
        {layout?.display === "carousel" && <Carousel {...layout} children={items} />}
      </>
    </Container>
  );
}

export default SectionLayout;
