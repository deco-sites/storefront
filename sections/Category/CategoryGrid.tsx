import { type LoadingFallbackProps } from "@deco/deco";
import { useDevice } from "@deco/deco/hooks";
import CategoryCard, {
  type Item,
} from "../../components/category/grid/Card.tsx";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props extends SectionHeaderProps {
  items: Item[];
}

function CategoryGrid({ title, cta, items }: Props) {
  const device = useDevice();
  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      {device === "desktop"
        ? (
          <div class="grid grid-cols-6 gap-10">
            {items.map((item) => <CategoryCard {...item} />)}
          </div>
        )
        : (
          <Slider class="carousel carousel-center sm:carousel-end gap-5 w-full">
            {items.map((item, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "first:pl-5 first:sm:pl-0",
                  "last:pr-5 last:sm:pr-0",
                )}
              >
                <CategoryCard {...item} />
              </Slider.Item>
            ))}
          </Slider>
        )}
    </Section.Container>
  );
}
export const LoadingFallback = (
  { title, cta }: LoadingFallbackProps<Props>,
) => (
  <Section.Container>
    <Section.Header title={title} cta={cta} />
    <Section.Placeholder height="212px" />;
  </Section.Container>
);
export default CategoryGrid;
