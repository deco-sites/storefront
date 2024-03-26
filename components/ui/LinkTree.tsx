import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";
import type { ComponentChildren } from "preact";

export interface Props {
  header?: Header;
  social?: Social[];
  links?: Links;
  background?: Background;
  footer?: Footer;
}

export interface Header {
  /** @description 150px x 150px image recommended */
  logo?: Logo;
  /** @format textarea */
  title?: string;
  /** @format textarea */
  description?: string;
  /**
   * @format color
   * @description color to be used in title and description
   */
  textColor?: string;
}

export interface Logo {
  img?: ImageWidget;
  /** @description alternative text */
  alt?: string;
  width?: number;
  height?: number;
  /** @description external link on logo */
  link?: string;
}

export interface Social {
  href?: string;
  label:
    | "Instagram"
    | "Facebook"
    | "Linkedin"
    | "WhatsApp"
    | "Discord"
    | "Tiktok";
  /** @format color */
  iconColor?: string;
  /** @description width of the SVG line */
  strokeWidth?: number;
}

export interface Links {
  list?: (Link | Image)[];
  style?: Style;
}

export interface Image {
  /** @description alternative text */
  label?: string;
  src?: ImageWidget;
  width?: number;
  height?: number;
}

export interface Link {
  /** @format textarea */
  label?: string;
  href?: string;
  icon?: AvailableIcons | Image;
}

export interface Style {
  /**
   * @format color
   * @description color to be used in link's text
   */
  textColor?: string;
  gradientColors?: Gradient;
  border?: boolean;
}

export interface Gradient {
  /** @description multiple colors will create a gradient effect */
  neutral: Neutral[];
}

export interface Neutral {
  /**  @format color */
  color: string;
}

export interface Background {
  /** @description an image will override any background color */
  image?: ImageWidget;
  /** @format color */
  backgroundColor?: string;
}

export interface Footer {
  url?: string;
  image?: ImageWidget;
  /** @description alternative text */
  alt?: string;
  width?: number;
  height?: number;
  text?: string;
}

function Links(props: Props) {
  const { header, background, links, social } = props;
  const logo = (
    <Image
      decoding="async"
      src={header?.logo?.img || ""}
      alt={header?.logo?.alt}
      width={header?.logo?.width || 104}
      height={header?.logo?.height || 104}
    />
  );

  const maybeLink = header?.logo?.link
    ? <a href={header?.logo?.link!} target="_blank">{logo}</a>
    : logo;

  const ColorsNeutralAndHover = {
    color: links?.style?.textColor,
    backgroundImage: `linear-gradient(to right, ${
      links?.style?.gradientColors?.neutral.map((color) => color.color).join(
        ", ",
      )
    })`,
  };
  function isImage(icon: AvailableIcons | Image): icon is Image {
    return (icon as Image).src !== undefined;
  }

  function isLink(list: Link | Image): list is Link {
    return (list as Link).href !== undefined;
  }

  return (
    <BaseContainer background={background}>
      <header class="flex flex-col gap-4 items-center justify-center">
        {header?.logo?.img && (
          <div class="p-4 rounded-full">
            {maybeLink}
          </div>
        )}

        {header?.title && (
          <h1
            class="text-6xl text-center"
            style={{ color: header.textColor }}
          >
            {header?.title}
          </h1>
        )}

        {header?.description && (
          <p
            style={{ color: header.textColor }}
          >
            {header?.description}
          </p>
        )}
      </header>

      <main class="w-full flex flex-col">
        <ul class="flex flex-row gap-4 items-center justify-center mb-10">
          {social?.map((link) => (
            <li>
              <a
                target="_blank"
                href={link.href}
                title={link.label}
                class="block rounded text-white"
              >
                <Icon
                  size={20}
                  id={link.label}
                  strokeWidth={link.strokeWidth || 2}
                  fill={link.iconColor}
                  style={{ color: link.iconColor }}
                />
              </a>
            </li>
          ))}
        </ul>
        <ul class="flex flex-col gap-4 items-center justify-center">
          {links?.list?.map((list: Link | Image, index: number) => {
            if (isLink(list)) {
              return (
                <li class="w-full" key={index}>
                  <a
                    target="_blank"
                    href={list.href}
                    class={`flex gap-4 group h-[52px] items-center justify-start px-2 rounded-full ${
                      links?.style?.border ? "border border-base-content" : ""
                    } w-full`}
                    style={ColorsNeutralAndHover}
                  >
                    {list.icon && !isImage(list.icon) && (
                      <Icon
                        size={20}
                        id={list.icon}
                        strokeWidth={2}
                      />
                    )}

                    {list.icon && isImage(list.icon) && (
                      <Image
                        src={list.icon.src || ""}
                        alt={list.icon.label}
                        width={list.icon.width || 36}
                        height={list.icon.height || 36}
                      />
                    )}
                    <span class="text-center text-sm w-full">
                      {list.label}
                    </span>

                    <Icon
                      size={20}
                      id="share"
                      strokeWidth={2}
                      class="group-hover:opacity-100 opacity-0"
                    />
                  </a>
                </li>
              );
            } else {
              return (
                <Image
                  src={list.src || ""}
                  alt={list.label}
                  width={list.width || 688}
                  height={list.height || 344}
                />
              );
            }
          })}
        </ul>
      </main>

      <footer class="flex flex-1 flex-col">
        {props.footer && (props.footer.image || props.footer.text) && (
          <div class="mt-auto">
            <a
              href={props.footer.url}
              class="flex flex-row gap-1 items-center justify-center text-xs"
              target="_blank"
            >
              {props.footer.text && (
                <p
                  style={{ color: header?.textColor }}
                >
                  {props.footer.text}
                </p>
              )}
              {props.footer.image && (
                <Image
                  src={props.footer.image || ""}
                  alt={props.footer.alt}
                  width={props.footer.width || 50}
                  height={props.footer.height || 20}
                />
              )}
            </a>
          </div>
        )}
      </footer>
    </BaseContainer>
  );
}

function BaseContainer(props: {
  children?: ComponentChildren;
  background?: Props["background"];
}) {
  const { image } = props?.background ?? {};
  const baseClasses = "flex justify-center w-full min-h-screen";
  const inlineStyle = image ? { background: `url(${image})` } : undefined;
  const backgroundColors = props?.background?.backgroundColor;
  const containerClasses = `${baseClasses}`;

  return (
    <div
      class={containerClasses}
      style={{
        ...inlineStyle,
        backgroundColor: backgroundColors ? backgroundColors : undefined,
      }}
    >
      <div class="flex flex-col gap-12 items-center max-w-[746px] p-10 w-full">
        {props.children}
      </div>
    </div>
  );
}

export default Links;
