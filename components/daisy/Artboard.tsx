import Image from "apps/website/components/Image.tsx";

export interface Props {
  size: Size;
  image: { src: string; alt: string };
  horizontal?: boolean;
}

type Size =
  | "320×568"
  | "375×667"
  | "414×736"
  | "375×812"
  | "414×896"
  | "320×1024";

export default function Artboard(props: Props) {
  const { size, image, horizontal } = props;
  const { width, height, phone } = getBoardSize(size, horizontal);

  return (
    <div
      className={`artboard phone-${phone} ${
        horizontal ? "artboard-horizontal" : ""
      } `}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        class="rounded object-cover"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}

const getBoardSize = (size: Size, horizontal: boolean | undefined) => {
  let [width, height] = size.split("x").map((dim) => parseInt(dim, 10));
  let phone;

  switch (height) {
    case 568:
      phone = "1";
      break;
    case 667:
      phone = "2";
      break;
    case 736:
      phone = "3";
      break;
    case 812:
      phone = "4";
      break;
    case 896:
      phone = "5";
      break;
    case 1024:
      phone = "6";
      break;
  }

  if (horizontal) {
    [width, height] = [height, width];
  }

  return { width, height, phone };
};
