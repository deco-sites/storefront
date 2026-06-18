import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";

export interface Image {
  image: ImageWidget;
  alt: string;
}

export interface Props extends SectionHeaderProps {
  images?: Image[];
}

function Logos({
  title,
  cta,
  images = [
    {
      alt: "deco",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fe7cd8ba-c954-45d6-9282-ee7d8ca8e3c7",
    },
    {
      alt: "deco",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/637e8601-6b86-4979-aa97-68013a2a60fd",
    },
  ],
}: Props) {
  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      <ul class="flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-5 sm:px-0">
        {images.map((item) => (
          <li>
            <Image
              width={300}
              height={300}
              src={item.image}
              alt={item.alt}
              class="w-full h-full object-cover"
            />
          </li>
        ))}
      </ul>
    </Section.Container>
  );
}

export default Logos;
