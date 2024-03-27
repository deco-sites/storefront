import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Picture {
  mobile?: ImageWidget;
  desktop?: ImageWidget;
  alt?: string;
}

export default function Image(props: Picture) {
  const { mobile, desktop, alt } = props;
  return (
    <div class="max-w-[688px] mx-auto py-2 w-full lg:px-0 px-6">
      <figure class="relative">
        <Picture>
          <Source
            media="(max-width: 327px)"
            src={mobile || ""}
            width={327}
            height={344}
          />
          <Source
            media="(min-width: 688px)"
            src={desktop ? desktop : mobile || ""}
            width={688}
            height={344}
          />
          <img
            class="w-full object-cover"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={mobile}
            alt={alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </figure>
    </div>
  );
}
