import Header, {
  Content,
  Style as HeaderStyle,
} from "$store/components/ui/SectionHeader.tsx";
import {
  ButtonType,
  colorClasses,
  Colors,
  Layout as SectionLayout,
  layoutClasses,
  Section as SectionStyle,
  textColorClasses,
  TextColors,
} from "../../constants.tsx";
import { clx } from "$store/sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Section } from "deco/blocks/section.ts";

export type Layout = SectionLayout;
export type HeaderContent = Content;

export interface Style {
  section?: SectionStyle;
  content?: {
    alignment?: "Center" | "Left";
    bgColor?: Colors;
    bgImage?: ImageWidget;
    textColor?: TextColors;
  };
  header?: HeaderStyle;
  button?: ButtonType;
}

export interface ExtendedStyle {
  section?: SectionStyle;
  content?: {
    alignment?: "Center" | "Left" | "Side to side top" | "Side to side middle";
    bgColor?: Colors;
    bgImage?: ImageWidget;
    textColor?: TextColors;
  };
  header?: HeaderStyle;
  button?: ButtonType;
}

export interface Props {
  header?: HeaderContent;
  layout?: Layout;
  style?: ExtendedStyle;
  children: Section;
}

const DEFAULT_PROPS = {
  header: {
    title: "",
    description: "",
  },
} satisfies Partial<Props>;

const contentClasses = {
  "Center": "items-stretch",
  "Left": "",
  "Side to side top": "justify-between lg:grid lg:grid-flow-col",
  "Side to side middle":
    "justify-between items-center lg:flex-row lg:flex-nowrap",
};

export default function Container({ children, id, ...props }: Props) {
  const { header, layout, style } = { ...DEFAULT_PROPS, ...props };

  const sectionBgColor = style?.section?.bgColor || "Transparent";
  const contentBgColor = style?.content?.bgColor || "Transparent";
  const containerBgColorClasses = sectionBgColor
    ? colorClasses[sectionBgColor]
    : "";
  const contentBgColorClasses = contentBgColor
    ? colorClasses[contentBgColor]
    : "";

  const hasPadding =
    (contentBgColor !== "Transparent" && sectionBgColor !== contentBgColor) ||
    style?.content?.bgImage !== undefined;

  return (
    <div
      class={clx(
        containerBgColorClasses,
        layoutClasses[layout?.sectionWidth || "100%"],
        hasPadding && "p-4 lg:p-16",
        style?.section?.bgImage && "bg-cover bg-center",
      )}
      style={{
        "background-image": style?.section?.bgImage
          ? `url(${style?.section?.bgImage})`
          : "",
      }}
    >
      <div
        class={clx(
          "flex flex-col flex-wrap gap-6 lg:gap-12",
          hasPadding ? "p-4 lg:p-10" : "px-4 py-8 lg:py-16",
          layoutClasses[layout?.innerContentWidth || "Contained"],
          contentBgColorClasses,
          style?.content?.bgImage && "bg-cover bg-center",
          contentClasses[style?.content?.alignment || "Center"],
          textColorClasses[style?.content?.textColor || "Auto"],
        )}
        style={{
          "background-image": style?.content?.bgImage
            ? `url(${style?.content?.bgImage})`
            : "",
        }}
      >
        {header?.title || header?.description
          ? (
            <div class="flex flex-col gap-6 lg:gap-10 lg:min-w-[22rem]">
              <Header content={header} style={style?.header} />
            </div>
          )
          : ""}
        <div
          class={clx(
            "flex flex-col w-full",
            style?.content?.alignment == "Center"
              ? "items-center"
              : "items-left",
          )}
        >
          <children.Component {...children.props} />
        </div>
      </div>
    </div>
  );
}
