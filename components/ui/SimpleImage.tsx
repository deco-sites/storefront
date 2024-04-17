import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  altText?: string;
  position?: "Left" | "Right";
  width?: "30%" | "50%" | "70%";
  mobile?: ImageWidget;
  desktop?: ImageWidget;
}

export default function SimpleImage({
  altText = "Image",
  position = "Left",
  width,
  mobile =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
  desktop =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
}: Props) {
  const style = {
    width: {
      "30%": "lg:w-1/3",
      "50%": "lg:w-1/2",
      "70%": "lg:w-[70%]",
    },
  };

  return (
    <div
      class={clx(
        "flex-none",
        width ? style.width[width] : style.width["30%"],
      )}
    >
      <span
        class={clx(
          "hidden",
          style.width["30%"],
          style.width["50%"],
          style.width["70%"],
        )}
      >
      </span>
      <figure class="relative">
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={mobile}
            width={150}
            height={150}
          />
          <Source
            media="(min-width: 768px)"
            src={desktop ? desktop : mobile}
            width={384}
            height={227}
          />
          <img
            class="w-full object-cover"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={mobile}
            alt={altText}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </figure>
    </div>
  );
}
