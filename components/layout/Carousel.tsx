import type { Section } from "deco/blocks/section.ts";
import { ComponentChildren, toChildArray } from "preact";
import { useId } from "preact/hooks";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";

/**
 * @title Carousel
 */
export interface Props {
  children?: ComponentChildren;
  /** @description For automatic sliding in seconds. */
  interval?: number;
}

function Section({ interval = 0, children }: Props) {
  const id = useId();
  const items = toChildArray(children);

  if (!items.length) {
    return null;
  }

  return (
    <>
      <div
        id={id}
        class="grid grid-rows-[1fr_48px_1fr_40px] grid-cols-[48px_1fr_48px]"
      >
        {/* Items slider */}
        <Slider
          class={clx(
            "relative carousel carousel-center col-start-2 col-end-2 row-start-1 row-end-4",
            "gap-2 sm:gap-4",
          )}
        >
          {items?.map((item, index) => (
            <Slider.Item index={index} class="carousel-item w-auto">
              {item}
            </Slider.Item>
          ))}
        </Slider>

        {/* Buttons */}
        <div class="flex items-center justify-start z-10 col-start-1 row-start-2">
          <Slider.PrevButton class="btn btn-outline btn-circle btn-sm">
            <Icon
              class="text-base-content"
              size={24}
              id="ChevronLeft"
              strokeWidth={3}
            />
          </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-end z-10 col-start-3 row-start-2">
          <Slider.NextButton class="btn btn-outline btn-circle btn-sm">
            <Icon
              class="text-base-content"
              size={24}
              id="ChevronRight"
              strokeWidth={3}
            />
          </Slider.NextButton>
        </div>

        {/* Dots */}
        <ul class="carousel items-end justify-center col-span-full gap-4 z-10 row-start-4">
          {items?.map((_, index) => (
            <li class="carousel-item">
              <Slider.Dot index={index}>
                <div class="w-4 h-4 rounded-full group-disabled:bg-primary bg-transparent border-[1px] border-primary" />
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}

export default Section;
