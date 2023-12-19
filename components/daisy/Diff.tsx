export interface Props {
  oldImage: { src: string; alt: string };
  newImage: { src: string; alt: string };
}

export default function Diff(props: Props) {
  const { oldImage, newImage } = props;

  return (
    <div class="diff aspect-[16/9]">
      <div className="diff-item-1">
        <img alt={oldImage.alt} src={oldImage.src} />
      </div>
      <div className="diff-item-2">
        <img alt={newImage.alt} src={newImage.src} />
      </div>
      <div className="diff-resizer"></div>
    </div>
  );
}
