import {
  borderColorClasses,
  BorderColors,
  BorderRadius,
  borderRadiusClasses,
  BorderWidth,
  borderWidthClasses,
  colorClasses,
  Colors,
} from "$store/constants.tsx";
import { clx } from "$store/sdk/clx.ts";

export interface Bg {
  bgColor?: Colors;
}

export interface Link {
  href?: string;
  text?: string;
  style?: {
    background?: Bg;
    border?: {
      width?: BorderWidth;
      color?: BorderColors;
      radius?: BorderRadius;
    };
  };
}

export interface TextCaptureProps {
  text?: string;
  link?: Link[];
}

export default function TextCapture({
  text = "Comece Sua Jornada Ecommerce Agora",
  link = [
    {
      href: "https://m9vmkluj.paperform.co/",
      text: "Encontre Sua Agência",
      style: {
        background: {
          bgColor: "Base inverted",
        },
        border: {
          width: "None",
          color: "Primary",
          radius: "Full",
        },
      },
    },
    {
      href: "https://tjjqm5ct.paperform.co/",
      text: "Cadastre Sua Agência",
      style: {
        background: {
          bgColor: "Base",
        },
        border: {
          width: "1",
          color: "Primary",
          radius: "Full",
        },
      },
    },
  ],
}: TextCaptureProps) {
  return (
    <div class="bg-base-100 py-16 md:py-28">
      <section class="xl:container mx-auto flex flex-col items-center justify-center gap-8">
        <h1 class="text-center text-[36px] md:text-[56px] font-bold text-base-content md:max-w-2xl">
          {text}
        </h1>
        <div class="flex flex-col lg:flex-row gap-4">
          {link?.map((item) => {
            const bgColor = item?.style?.background?.bgColor || "Primary";
            const hasPadding = (bgColor && bgColor !== "Transparent") ||
              (item?.style?.border?.width &&
                item.style.border.width !== "None");
            const borderColor = item?.style?.border?.color;
            const borderWidth = item?.style?.border?.width;
            const borderRadius = item?.style?.border?.radius;
            return (
              <a
                class={clx(
                  "rounded-full text-lg py-4 px-8 font-semibold transition-colors duration-200 cursor-pointer",
                  bgColor && colorClasses[bgColor],
                  hasPadding && "p-4 lg:p-8",
                  borderColor && borderColorClasses[borderColor],
                  borderWidth && borderWidthClasses[borderWidth],
                  borderRadius && borderRadiusClasses[borderRadius],
                )}
              >
                {item?.text}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
