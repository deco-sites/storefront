import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Container, {
  ExtendedStyle,
  HeaderContent,
  Layout,
} from "$store/components/ui/Container.tsx";
import { imgPh } from "$store/components/ui/Types.tsx";

/**
 * @titleBy alt
 */
export interface Image {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  alt: string;
  href: string;
}

export type BorderRadius =
  | "None"
  | "Small"
  | "Medium"
  | "Large"
  | "Extra large"
  | "2x Extra large"
  | "3x Extra large"
  | "Full";

export interface Items {
  /** @default Auto */
  mobile?: "Auto" | "1" | "2";
  /** @default Auto */
  desktop?: "Auto" | "1" | "2" | "4" | "6" | "8";
}

export interface Border {
  /** @default none */
  mobile?: BorderRadius;
  /** @default none */
  desktop?: BorderRadius;
}

export interface ItemsLayout {
  itemsPerLine?: Items;
  /**
   * @description Item's border radius
   */
  borderRadius?: Border;
}

export interface Size {
  /** @default 600 */
  width: number;
  /** @default 300 */
  height: number;
}

export interface Props {
  header?: HeaderContent;
  images?: Image[];
  imageSize?: Size;
  itemsLayout?: ItemsLayout;
  layout?: Layout;
  style?: ExtendedStyle;
}

const MOBILE_COLUMNS = {
  "Auto": "grid-flow-col",
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  "Auto": "lg:grid-flow-col",
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-2",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-8",
  8: "lg:grid-cols-8",
};

const RADIUS_MOBILE = {
  "None": "rounded-none",
  "Small": "rounded-sm",
  "Medium": "rounded-md",
  "Large": "rounded-lg",
  "Extra large": "rounded-xl",
  "2x Extra large": "rounded-2xl",
  "3x Extra large": "rounded-3xl",
  "Full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "None": "lg:rounded-none",
  "Small": "lg:rounded-sm",
  "Medium": "lg:rounded-md",
  "Large": "lg:rounded-lg",
  "Extra large": "lg:rounded-xl",
  "2x Extra large": "lg:rounded-2xl",
  "3x Extra large": "lg:rounded-3xl",
  "Full": "lg:rounded-full",
};

export default function ImageGrid({
  header,
  layout,
  itemsLayout,
  style,
  images = [
    {
      srcMobile: imgPh["rct-sm"],
      srcDesktop: "",
      alt: "",
      href: "/",
    },
    {
      srcMobile: imgPh["rct-sm"],
      srcDesktop: "",
      alt: "",
      href: "/",
    },
    {
      srcMobile: imgPh["rct-sm"],
      srcDesktop: "",
      alt: "",
      href: "/",
    },
    {
      srcMobile: imgPh["rct-sm"],
      srcDesktop: "",
      alt: "",
      href: "/",
    },
  ],
  imageSize = { width: 600, height: 300 },
}: Props) {
  const items = itemsLayout?.itemsPerLine;
  const radius = itemsLayout?.borderRadius;

  return (
    <Container header={header} layout={layout} style={style}>
      <div
        class={`grid gap-4
          ${MOBILE_COLUMNS[items?.mobile ?? "Auto"]}
          ${DESKTOP_COLUMNS[items?.desktop ?? "Auto"]}
          ${items?.mobile === "Auto" ? "lg:grid-flow-dense" : ""}
        `}
      >
        {images.map(({ href, srcMobile, srcDesktop, alt }) => (
          <a
            href={href}
            class={`overflow-hidden
              ${RADIUS_MOBILE[radius?.mobile ?? "None"]}
              ${RADIUS_DESKTOP[radius?.desktop ?? "None"]}
            `}
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={imageSize.width}
                height={imageSize.height}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={imageSize.width}
                height={imageSize.height}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        ))}
      </div>
    </Container>
  );
}
