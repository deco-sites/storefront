import Button from "$store/components/ui/Button.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy alt
 */
export interface Props {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
  preload?: boolean;
}

function Banner({ alt, mobile, desktop, action, preload }: Props) {
  return (
    <a
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative h-[600px] overflow-y-hidden"
    >
      <Picture preload={preload}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={preload ? "high" : "auto"}
          src={mobile}
          width={360}
          height={600}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={preload ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class="object-cover min-w-[100vw]"
          loading={preload ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      {action && (
        <div class="absolute h-min top-0 bottom-0 m-auto left-0 right-0 sm:right-auto sm:left-[12%] max-h-min max-w-[235px] flex flex-col gap-4 p-4 rounded glass">
          <span class="text-6xl font-medium text-base-100">
            {action.title}
          </span>
          <span class="font-medium text-xl text-base-100">
            {action.subTitle}
          </span>
          <Button class="glass">{action.label}</Button>
        </div>
      )}
    </a>
  );
}

export default Banner;
