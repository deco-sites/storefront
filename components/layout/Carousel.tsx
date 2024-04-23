import type { Section } from "deco/blocks/section.ts";
import { ComponentChildren, toChildArray } from "preact";
import { useId } from "preact/hooks";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { buttonClasses, ButtonColor, grid } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";

interface Layout {
  /** @description For desktop in px. */
  itemWidth?: number;
  gap?: {
    /** @default 2 */
    mobile?: "1" | "2" | "4" | "8" | "12" | "16";
    /** @default 4 */
    desktop?: "1" | "2" | "4" | "8" | "12" | "16";
  };
  hide?: {
    controls?: boolean;
    indicators?: boolean;
  };
}

/**
 * @title Carousel
 */
export interface Props {
  children?: ComponentChildren;
  /** @description For automatic sliding in seconds. */
  interval?: number;
  layout?: Layout;
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
        class={clx(
          "grid grid-rows-[1fr_48px_1fr_40px]",
          !layout?.hide?.controls
            ? "grid-cols-[48px_1fr_48px] sm:grid-cols-[48px_1fr_48px]"
            : "grid-cols-[0_1fr_0]",
        )}
      >
        <Slider
          class={clx(
            "relative carousel carousel-center col-start-2 col-end-2 row-start-1 row-end-4",
            layout?.gap?.mobile
              ? grid.gap.mobile[layout.gap.mobile]
              : grid.gap.mobile[2],
            layout?.gap?.desktop
              ? grid.gap.desktop[layout.gap.desktop]
              : grid.gap.mobile[4],
          )}
        >
          {items?.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item"
              style={{ width: layout?.itemWidth || "auto" }}
            >
              {item}
            </Slider.Item>
          ))}
        </Slider>

        {!layout?.hide?.controls && (
          <>
            <div class="flex items-center justify-start z-10 col-start-1 row-start-2">
              <Slider.PrevButton
                class={clx(controlClx, "btn btn-circle btn-sm")}
              >
                <Icon
                  class="text-base-content"
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={3}
                />
              </Slider.PrevButton>
            </div>
            <div class="flex items-center justify-end z-10 col-start-3 row-start-2">
              <Slider.NextButton
                class={clx(controlClx, "btn btn-circle btn-sm")}
              >
                <Icon
                  class="text-base-content"
                  size={24}
                  id="ChevronRight"
                  strokeWidth={3}
                />
              </Slider.NextButton>
            </div>
          </>
        )}

        {!layout?.hide?.indicators && (
          <ul class="carousel items-end justify-center col-span-full gap-4 z-10 row-start-4">
            {items?.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div class="w-4 h-4 rounded-full group-disabled:bg-primary bg-transparent border-[1px] border-primary" />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        )}

        <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}

export default Section;
