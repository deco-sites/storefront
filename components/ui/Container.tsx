import type { VNode } from "preact";
import Header, {
  Props as HeaderProps,
} from "$store/components/ui/SectionHeader.tsx";
import {
  ButtonType,
  colorClasses,
  Colors,
  Layout as SectionLayout,
  layoutClasses,
  SectionBackGround,
  textColorClasses,
  TextColors,
} from "$store/components/ui/Types.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";
import { Section } from "deco/blocks/section.ts";

export type Layout = SectionLayout;
export type HeaderContent = HeaderProps;

export interface ExtendedStyle {
  section?: SectionBackGround;
  content?: {
    alignment?: "Center" | "Left" | "Side to side top" | "Side to side middle";
    bgColor?: Colors;
    bgImage?: ImageWidget;
    textColor?: TextColors;
  };
  button?: ButtonType;
}

export interface Props {
  header?: HeaderContent;
  layout?: Layout;
  style?: ExtendedStyle;
  /** @ignore */
  children?: VNode;
  childrenSection?: Section;
  afterHeader?: VNode | false;
}

const DEFAULT_PROPS: Props = {
  header: {
    title: "",
    description: "",
    alignment: "center",
  },
};

export default function Container({ children, ...props }: Props) {
  const { header, layout, style, afterHeader, childrenSection } = {
    ...DEFAULT_PROPS,
    ...props,
  };

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
    (style?.section?.bgImage !== undefined &&
      contentBgColor !== "Transparent") ||
    style?.content?.bgImage !== undefined;

  const contentClasses = {
    "Center": "items-stretch",
    "Left": "",
    "Side to side top": "justify-between lg:grid lg:grid-flow-col",
    "Side to side middle":
      "justify-between items-center lg:flex-row lg:flex-nowrap",
  };

  return (
    <div
      class={clx(
        containerBgColorClasses,
        layoutClasses[layout?.sectionWidth || "100%"],
        hasPadding ? "p-4 lg:p-16" : "",
        style?.section?.bgImage ? "bg-cover bg-center" : "",
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
          afterHeader ? "lg:grid lg:grid-cols-2" : "",
          hasPadding ? "p-4 lg:p-10" : "px-4 py-8 lg:py-16",
          layoutClasses[layout?.innerContentWidth || "Contained"],
          contentBgColorClasses,
          style?.content?.bgImage ? "bg-cover bg-center" : "",
          contentClasses[style?.content?.alignment || "Center"],
          textColorClasses[style?.content?.textColor || "Auto"],
        )}
        style={{
          "background-image": style?.content?.bgImage
            ? `url(${style?.content?.bgImage})`
            : "",
        }}
      >
        {header?.title || header?.description || afterHeader
          ? (
            <div class="flex flex-col gap-6 lg:gap-10 lg:min-w-[22rem]">
              <Header {...header} />
              {afterHeader}
            </div>
          )
          : ""}
        <div
          class={`flex flex-col w-full ${
            style?.content?.alignment == "Center"
              ? "items-center"
              : "items-left"
          }`}
        >
          {children}
          {childrenSection && (
            <childrenSection.Component {...childrenSection.props} />
          )}
        </div>
      </div>
    </div>
  );
}
