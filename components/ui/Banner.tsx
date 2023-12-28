import Button from "$store/components/ui/Button.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Header from "$store/components/ui/SectionHeader.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Button label */
    label?: string;
  };
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  fullWidth?: false | true;
  banners: Banner[];
}

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function Banner({
  title,
  borderRadius,
  banners = [],
  fullWidth,
}: Props) {
  return (
    <div class="bg-[#FFF] w-full h-full pb-10 pt-6">
      <section
        class={`xl:container w-full mx-auto py-2 md:pb-12 ${
          fullWidth ? "px-0" : "px-5"
        }`}
      >
        <Header
          title={title || ""}
          description={""}
          fontSize={"Large"}
          alignment={"center"}
        />
        <div
          class={`grid gap-4 md:gap-6 grid-cols-1`}
        >
          {banners.map(({ srcMobile, srcDesktop, alt, action }) => (
            <a
              href={action?.href ?? "#"}
              class={`overflow-hidden relative flex justify-center items-center ${
                RADIUS_MOBILE[borderRadius.mobile ?? "none"]
              } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
            >
              <Picture preload={false}>
                <Source
                  media="(max-width: 767px)"
                  src={srcMobile ?? ""}
                  width={152}
                  height={68}
                />
                <Source
                  media="(min-width: 768px)"
                  src={srcDesktop ?? ""}
                  width={384}
                  height={168}
                />
                <img
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={srcMobile ?? ""}
                  alt={alt}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
              {action && (
                <div class="absolute h-min m-auto flex flex-col gap-4 p-4 rounded justify-center items-center">
                  <span class="text-[56px] font-bold text-base-100">
                    {action?.title}
                  </span>
                  <span class="text-[18px] text-base-100">
                    {action?.subTitle}
                  </span>
                  <div class="flex gap-4">
                    <Button class="bg-[#000] text-[#FFF] hover:bg-[#FFF] hover:text-[#000] border-[#181212]">
                      {action.label}
                    </Button>
                    <Button class="bg-transparent text-[#FFF] hover:text-[#000] hover:bg-[#EFF0F0] hover:border-[#C9CFCF] border-[#FFF]">
                      {action.label}
                    </Button>
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
