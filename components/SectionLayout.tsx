import { ComponentChildren } from "preact";
import Flex, { Props as FlexProps } from "../sections/Layout/Flex.tsx";
import Grid, { Props as GridProps } from "../sections/Layout/Grid.tsx";
import Slider, { Props as SliderProps } from "../sections/Layout/Slider.tsx";
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
  display?: "slider";
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
      {layout?.display === "grid" && <Grid {...layout} children={items} />}
      {layout?.display === "flex" && <Flex {...layout} children={items} />}
      {layout?.display === "slider" && <Slider {...layout} children={items} />}
    </Container>
  );
}

export default SectionLayout;
