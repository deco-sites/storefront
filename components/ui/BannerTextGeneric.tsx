import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import BannerCarousel from "$store/components/ui/BannerCarousel.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface BannerProps {
  /**  @title Image Mobile */
  mobile?: ImageWidget;
  /**  @title Image Desktop */
  desktop?: ImageWidget;

  title?: string;
  description?: string;
}

export interface CTAProps {
  href: string;
  text: string;
  icon?: AvailableIcons;
  variants?: "Normal" | "Reverse" | "Border none";
  hide?: {
    icon?: boolean;
  };
}

export interface BannerTextGenericProps {
  title?: string;

  /** @format html */
  description?: string;

  ctaList?: CTAProps[];

  banners?: BannerProps[];

  /**  @title Hide Components */
  hide?: {
    cta?: boolean;
  };

  layout?: {
    alignment?: "Row" | "Column" | "Row reverse" | "Column reverse";
    image?: "Background" | "Front";
  };
}

export default function BannerTextGeneric(
  {
    title = "Title",
    description =
      "Description text. Description text. Description text. Description text. Description text. Description text. Description text.",
    ctaList = [
      { href: "/", text: "CTA 1" },
      { href: "/", text: "CTA 2" },
      { href: "/", text: "CTA 3" },
    ],
    layout,
    hide = {
      cta: false,
    },
    banners,
  }: BannerTextGenericProps,
) {
  const ALIGNMENT_LAST_CHILD = {
    "Row": "col-start-2 row-start-1",
    "Column": "",
    "Row reverse": banners?.length > 0 ? "col-start-1 row-start-1" : "",
    "Column reverse": "",
  };

  const ALIGNMENT_FIRST_CHILD = {
    "Row": "col-start-1 row-start-1",
    "Column": "",
    "Row reverse": banners?.length > 0
      ? "col-start-2 row-start-1"
      : "col-start-1 row-start-1",
    "Column reverse": "",
  };

  const BACKGROUND_CTA = {
    "Reverse":
      "bg-[#FFF] text-[#000] border border-[#C9CFCF] hover:bg-[#C9CFCF] hover:border-[#C9CFCF]",
    "Normal":
      "bg-[#000] text-[#FFF] border border-[#181212] hover:bg-[#FFF] hover:text-[#181212]",
    "Border none": `bg-transparent hover:bg-transparent px-0 ${
      layout?.variants?.section === "Reverse"
        ? "text-[#FFF] hover:underline"
        : "text-[#181212] hover:underline"
    } border-none`,
  };

  const ALIGNMENT_CONTAINER = {
    "Row": banners?.length > 0
      ? "grid grid-cols-2 grid-rows-1"
      : "grid grid-cols-1 grid-rows-1",
    "Column": "flex flex-col items-center",
    "Row reverse": banners?.length > 0
      ? "grid grid-cols-2 grid-rows-1"
      : "grid grid-cols-1 grid-rows-1",
    "Column reverse": "flex flex-col-reverse items-center",
  };

  const CtaButton = ({ href, text, icon, hide, variants }: CTAProps) => (
    <a
      href={href ?? "#"}
      class={`block rounded-full duration-200 normal-case px-6 py-3  ${
        !hide?.icon ? "pr-3" : "pr-4"
      } transition-colors duration-200 flex items-center gap-2 ${
        BACKGROUND_CTA[variants ?? "Normal"]
      }`}
    >
      <span class="h-full flex justify-center items-center">
        {text}
      </span>
      <span class="h-full flex justify-center items-center">
        {!hide?.icon && icon ? <Icon id={icon} size={30} /> : ""}
      </span>
    </a>
  );

  const textContainer = (
    <>
      <div
        class={`flex gap-4 mx-auto
      ${
          layout?.alignment === "Column reverse"
            ? "flex flex-col md:flex-row justify-stretch md:justify-around md:items-center gap-12"
            : "flex flex-col gap-12"
        }
    `}
      >
        <p
          class={`font-bold text-[48px] md:text-[56px] leading-[120%] w-full
          ${
            layout?.alignment === "Column"
              ? "text-center"
              : "text-center md:text-start"
          }
        `}
        >
          {title}
        </p>
        <div
          class={`flex flex-col gap-6 md:gap-8 w-full ${
            layout?.alignment === "Column"
              ? "md:items-center"
              : "items-center md:items-start"
          }`}
        >
          <div
            class={`md:text-[18px] leading-[150%] md:leading-8
          ${
              layout?.alignment === "Column"
                ? "text-center"
                : "text-center md:text-start"
            }
        `}
          >
            {description && (
              <p dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
          <div
            class={`${
              hide?.cta ? "hidden" : "flex flex-col lg:flex-row"
            } items-center gap-4`}
          >
            {ctaList.map((itemBtn) => CtaButton(itemBtn))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section class="w-full py-10 md:py-24">
      <div
        class={`relative z-0 ${
          layout?.image === "Background" && banners?.length
            ? "h-[900px] flex justify-center items-center"
            : "h-full"
        }`}
      >
        {layout?.image === "Background" && banners?.length
          ? (
            <Image
              width={400}
              height={380}
              src={banners[0]?.desktop ?? ""}
              class="w-full h-full object-cover absolute z-[-1]"
            />
          )
          : null}

        <div
          class={`xl:container xl:mx-auto mx-5 md:mx-10 ${
            ALIGNMENT_CONTAINER[layout?.alignment ?? "Column"]
          } gap-12 md:gap-16 items-center justify-center`}
        >
          <div />
          <div
            class={`w-full ${
              ALIGNMENT_FIRST_CHILD[layout?.alignment ?? "Column"]
            }`}
          >
            {textContainer}
          </div>
          <div
            class={`w-full ${
              ALIGNMENT_LAST_CHILD[layout?.alignment ?? "Column"]
            }`}
          >
            {layout?.image === "Background" ? null : banners?.length === 1
              ? (
                <div>
                  <Picture>
                    <Source
                      media="(max-width: 767px)"
                      src={banners[0]?.mobile ?? ""}
                      width={181.5}
                      height={174.75}
                    />
                    <Source
                      media="(min-width: 768px)"
                      src={banners[0]?.desktop ?? ""}
                      width={228}
                      height={219.5}
                    />
                    <img
                      class="w-full object-cover"
                      sizes="(max-width: 640px) 100vw, 30vw"
                      src={banners[0]?.mobile ?? ""}
                      alt={banners[0]?.title ?? ""}
                      decoding="async"
                      loading="lazy"
                    />
                  </Picture>
                  {banners[0]?.title || banners[0]?.description
                    ? (
                      <div class="flex flex-col bg-[#f2f2f2] items-start gap-4 px-4 py-8 md:px-6 md:py-10">
                        <div class="flex justify-start">
                          <h1 class="font-semibold text-xl lg:text-2xl">
                            {banners[0]?.title}
                          </h1>
                        </div>
                        <div class="flex flex-col items-start w-full">
                          {banners[0]?.description && (
                            <p class="md:leading-8">
                              {banners[0]?.description}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                    : null}
                </div>
              )
              : <BannerCarousel images={banners} />}
          </div>
        </div>
      </div>
    </section>
  );
}
