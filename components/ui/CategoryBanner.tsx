import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** @description text to be rendered on top of the image */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      title: "Woman",
      matcher: "/*",
      subtitle: "As",
    },
  ],
};

function Banner(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  const { title, subtitle, image } = banner;

  return (
    <div class="grid grid-cols-1 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={360}
          height={120}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          height={200}
          media="(min-width: 767px)"
        />
        <img class="w-full" src={image.desktop} alt={image.alt ?? title} />
      </Picture>

      <div class="container flex flex-col items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full">
        <h1>
          <span class="text-5xl font-medium text-base-100">
            {title}
          </span>
        </h1>
        <h2>
          <span class="text-xl font-medium text-base-100">
            {subtitle}
          </span>
        </h2>
      </div>
    </div>
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = (props: Props, req: Request) => {
  const { banners } = { ...DEFAULT_PROPS, ...props };

  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
