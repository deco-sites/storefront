import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import S from "../../components/ui/Section.tsx";
import { type Section } from "@deco/deco/blocks";
export interface Props {
  section: Section;
  image: {
    src: ImageWidget;
    alt?: string;
    href?: string;
  };
}
function ShelfWithImage({ section, image }: Props) {
  return (
    <div class="container">
      <div class="grid md:grid-cols-2 grid-cols-1">
        <div class="md:max-w-xs mx-auto flex items-center">
          <section.Component {...section.props} />
        </div>
        <a href={image.href}>
          <Image
            src={image.src}
            class="w-full h-full object-cover"
            width={720}
            height={640}
            alt={image.alt}
          />
        </a>
      </div>
    </div>
  );
}
export const LoadingFallback = () => <S.Placeholder height="640px" />;
export default ShelfWithImage;
