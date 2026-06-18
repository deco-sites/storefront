import { type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { type LoadingFallbackProps } from "@deco/deco";
/**
 * @titleBy alt
 */
interface Banner {
  mobile: ImageWidget;
  desktop?: ImageWidget;
  /** @description Image alt texts */
  alt: string;
  /** @description Adicione um link */
  href: string;
}
interface Props extends SectionHeaderProps {
  /**
   * @maxItems 4
   * @minItems 4
   */
  banners?: Banner[];
}
function Banner({ mobile, desktop, alt, href }: Banner) {
  return (
    <a href={href} class="overflow-hidden">
      <Picture>
        <Source
          width={190}
          height={190}
          media="(max-width: 767px)"
          src={mobile}
        />
        <Source
          width={640}
          height={420}
          media="(min-width: 768px)"
          src={desktop || mobile}
        />
        <img
          width={640}
          class="w-full h-full object-cover"
          src={mobile}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
    </a>
  );
}
function Gallery({
  title,
  cta,
  banners = [
    {
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      alt: "Fashion",
      href: "/",
    },
    {
      alt: "Fashion",
      href: "/",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/1125d938-89ff-4aae-a354-63d4241394a6",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/1125d938-89ff-4aae-a354-63d4241394a6",
    },
    {
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/dd1e2acb-ff80-49f9-8f56-1deac3b7a42d",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/dd1e2acb-ff80-49f9-8f56-1deac3b7a42d",
      href: "/",
      alt: "Fashion",
    },
    {
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/0b85ba2d-48b1-4f5b-b619-7f4a7f50b455",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/0b85ba2d-48b1-4f5b-b619-7f4a7f50b455",
      alt: "Fashion",
      href: "/",
    },
  ],
}: Props) {
  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      <ul class="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 px-5 sm:px-0">
        {banners.map((item) => (
          <li>
            <Banner {...item} />
          </li>
        ))}
      </ul>
    </Section.Container>
  );
}
export const LoadingFallback = (
  { title, cta }: LoadingFallbackProps<Props>,
) => (
  <Section.Container>
    <Section.Header title={title} cta={cta} />

    <Section.Placeholder height="635px" />;
  </Section.Container>
);
export default Gallery;
