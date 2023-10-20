import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { buttonClasses, ButtonColor, grid, VNode } from "../../constants.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { clx } from "$store/sdk/clx.ts";
import type { Section } from "deco/blocks/section.ts";
import { toChildArray } from "preact";
import { useId } from "preact/hooks";

export interface Props {
  children: VNode[] | null;
  interval?: number;
  /** @description For desktop in px. */
  layout?: {
    itemWidth?: number;
    gap?: {
      /** @default 2 */
      mobile?: "1" | "2" | "4" | "8" | "12" | "16";
      /** @default 4 */
      desktop?: "1" | "2" | "4" | "8" | "12" | "16";
    };
    dots?: boolean;
    controls?: boolean;
  };
  style?: {
    controlsColor?: ButtonColor;
    controlsOutline?: boolean;
  };
}

function Section({ interval = 0, layout, style, children }: Props) {
  const id = useId();
  const items = toChildArray(children);

  if (!items.length) {
    return null;
  }

  const controlClx = clx(
    buttonClasses[style?.controlsColor || "Default"],
    style?.controlsOutline && "btn-outline",
  );

  return (
    <>
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
      >
        <Slider class={clx(
          "carousel carousel-center w-full col-span-full row-span-full",
          layout?.gap?.mobile ? grid.gap.mobile[layout.gap.mobile] : grid.gap.mobile[2],
          layout?.gap?.desktop ? grid.gap.desktop[layout.gap.desktop] : grid.gap.mobile[4],
        )}>
          {items?.map((item, index) => (
            <Slider.Item index={index} class="carousel-item max-sm:!w-48" style={{width: layout?.itemWidth || "auto" }}>
              {item}
            </Slider.Item>
          ))}
        </Slider>

        {layout?.controls && (
          <>
            <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
              <Slider.PrevButton
                class={clx(controlClx, "btn btn-circle btn-sm lg:btn-md")}
              >
                <Icon
                  class="text-base-100"
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={3}
                />
              </Slider.PrevButton>
            </div>
            <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
              <Slider.NextButton
                class={clx(controlClx, "btn btn-circle btn-sm lg:btn-md")}
              >
                <Icon
                  class="text-base-100"
                  size={24}
                  id="ChevronRight"
                  strokeWidth={3}
                />
              </Slider.NextButton>
            </div>
          </>
        )}

        {layout?.dots && (
          <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
            {items?.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div class="py-5">
                    <div
                      class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                      style={{ animationDuration: `${interval}s` }}
                    />
                  </div>
                </Slider.Dot>
              </li>
            ))}
          </ul>
        )}

        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}

export default Section;
