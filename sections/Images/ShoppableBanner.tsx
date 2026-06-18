import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };

  pins?: Pin[];

  title?: {
    content?: string;
    layout?: {
      position?: "justify-start" | "justify-center" | "justify-end";
    };
  };
  text?: {
    content?: string;
    layout?: {
      position?: "text-center" | "text-left" | "text-right";
    };
  };
  link?: {
    layout?: {
      position?: "justify-start" | "justify-center" | "justify-end";
    };
    text: string;
    href: string;
  };
}

export interface Pin {
  mobile: {
    x: number;
    y: number;
  };
  desktop?: {
    x: number;
    y: number;
  };
  link: string;
  label: string;
}

const DEFAULT_PROPS: Props = {
  title: {
    layout: {
      position: "justify-center",
    },
    content: "Collection",
  },
  text: {
    layout: {
      position: "text-center",
    },
    content: "Your text",
  },
  link: {
    layout: {
      position: "justify-center",
    },
    href: "#",
    text: "Text link",
  },
  pins: [],
  image: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
  },
};

function ShoppableBanner(props: Props) {
  const { link, text, title, image, pins } = { ...DEFAULT_PROPS, ...props };

  return (
    <div class="container">
      <div class="card lg:card-side rounded grid grid-cols-1 lg:grid-cols-2">
        <figure class="relative">
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={image?.mobile}
              width={150}
              height={150}
            />
            <Source
              media="(min-width: 768px)"
              src={image?.desktop ? image?.desktop : image?.mobile}
              width={384}
              height={227}
            />
            <img
              class="w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.mobile}
              alt={image?.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
          {pins?.map(({ mobile, desktop, link, label }) => (
            <>
              <a
                href={link}
                class="absolute w-min btn btn-accent rounded-full hover:rounded text-accent no-animation md:scale-[30%] hover:text-accent-content hover:scale-125 sm:hidden"
                style={{
                  left: `${mobile.x}%`,
                  top: `${mobile.y}%`,
                }}
              >
                <span>{label}</span>
              </a>
              <a
                href={link}
                class="absolute w-min btn btn-accent rounded-full hover:rounded text-accent no-animation md:scale-[30%] hover:text-accent-content hover:scale-125 hidden sm:inline-flex"
                style={{
                  left: `${desktop?.x ?? mobile.x}%`,
                  top: `${desktop?.y ?? mobile.y}%`,
                }}
              >
                <span>{label}</span>
              </a>
            </>
          ))}
        </figure>
        <div class="flex flex-col justify-center gap-6 py-20 px-8 bg-neutral-content">
          <h2 class={`card-title flex ${title?.layout?.position}`}>
            {title?.content}
          </h2>
          <p class={`text-base-content ${text?.layout?.position}`}>
            {text?.content}
          </p>
          <div class={`card-actions ${link?.layout?.position}`}>
            <a class="underline" href={link?.href}>{link?.text}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default ShoppableBanner;
