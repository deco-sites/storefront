import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section, { type Props as SectionHeaderProps, } from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useDevice } from "@deco/deco/hooks";
import { type LoadingFallbackProps } from "@deco/deco";
/** @titleBy label */
export interface Item {
    image: ImageWidget;
    href: string;
    label: string;
}
export interface Props extends SectionHeaderProps {
    items: Item[];
}
function Card({ image, href, label }: Item) {
    return (<a href={href} class="flex flex-col items-center justify-center gap-4">
      <div class="w-44 h-44 rounded-full bg-base-200 flex justify-center items-center border border-transparent hover:border-primary">
        <Image src={image} alt={label} width={100} height={100} loading="lazy"/>
      </div>
      <span class="font-medium text-sm">{label}</span>
    </a>);
}
function CategoryGrid({ title, cta, items }: Props) {
    const device = useDevice();
    return (<Section.Container>
      <Section.Header title={title} cta={cta}/>

      {device === "desktop"
            ? (<div class="grid grid-cols-6 gap-10">
            {items.map((i) => <Card {...i}/>)}
          </div>)
            : (<Slider class="carousel carousel-center sm:carousel-end gap-5 w-full">
            {items.map((i, index) => (<Slider.Item index={index} class={clx("carousel-item", "first:pl-5 first:sm:pl-0", "last:pr-5 last:sm:pr-0")}>
                <Card {...i}/>
              </Slider.Item>))}
          </Slider>)}
    </Section.Container>);
}
export const LoadingFallback = ({ title, cta }: LoadingFallbackProps<Props>) => (<Section.Container>
    <Section.Header title={title} cta={cta}/>
    <Section.Placeholder height="212px"/>;
  </Section.Container>);
export default CategoryGrid;
