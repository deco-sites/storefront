import Image from "apps/website/components/Image.tsx";

export interface Props {
  oldImage: { src: string; alt: string };
  newImage: { src: string; alt: string };
}

export default function Diff(props: Props) {
  const { oldImage, newImage } = props;

  return (
    <div class="diff aspect-[16/9]">
      <div className="diff-item-1">
        <Image
          alt={oldImage.alt}
          src={oldImage.src}
          width={1080}
          height={720}
        />
      </div>
      <div className="diff-item-2">
        <Image
          alt={newImage.alt}
          src={newImage.src}
          width={1080}
          height={720}
        />
      </div>
      <div className="diff-resizer"></div>
    </div>
  );
}
