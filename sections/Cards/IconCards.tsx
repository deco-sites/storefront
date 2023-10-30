import Grid, { Props as GridProps } from "$store/sections/Layout/Grid.tsx"
import IconCard, { Props as CardProps } from "../../components/cards/IconCard.tsx";

export interface Props {
  layoutType?: "Grid" | "Flex" | "Slider" | "Tab"
  items?: CardProps[];
  grid?: GridProps;
}

const ITEMS: CardProps[] = new Array(4).fill({
  label: "Placeholder",
  description: "Description placeholder",
  icon: "Deco",
});

export default function IconCards({ items = ITEMS, grid }: Props) {
    return (
      <Grid {...grid}>
        { items?.map((item) => <IconCard {...item} />) ?? null }
      </Grid>
  )
}