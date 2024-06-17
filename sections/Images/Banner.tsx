import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  title: string;
  description?: HTMLWidget;

  images: {
    mobile: ImageWidget;
    desktop: ImageWidget;
  };

  cta?: {
    href: string;
    label: string;
  };
}

function Banner({ title, description, images, cta }: Props) {
  return (
    <Section.Container>
      <div class="relative bg-base-200 mx-5 sm:mx-0">
        <Picture>
          <Source
            media="(max-width: 640px)"
            src={images.mobile}
            width={335}
            height={572}
          />
          <Source
            media="(min-width: 640px)"
            src={images.desktop}
            width={1320}
            height={480}
          />
          <img src={images.desktop} alt={title} class="w-full object-cover" />
        </Picture>

        <div
          class={clx(
            "absolute left-0 top-0",
            "p-5 sm:p-10",
            "flex flex-col gap-4",
            "h-full max-w-full sm:max-w-[33%]",
          )}
        >
          {title && <span class="font-bold text-7xl">{title}</span>}
          {description && (
            <span
              class="font-normal text-sm"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <span class="flex-grow" />
          <div>
            {cta && (
              <a
                href={cta.href}
                class="btn btn-primary no-animatio w-fit"
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </Section.Container>
  );
}

export default Banner;
