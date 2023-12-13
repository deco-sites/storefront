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
  const { w, h, p } = getBoardSize(size, horizontal);

  return (
    <div
      className={`artboard phone-${p} ${
        horizontal ? "artboard-horizontal" : ""
      } `}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={w}
        height={h}
        class="rounded object-cover"
        style={{ width: `${w}px`, height: `${h}px` }}
      />
    </div>
  );
}

const getBoardSize = (size: Size, horizontal: boolean | undefined) => {
  let width = parseInt(`${size[0]}${size[1]}${size[2]}`, 10);
  let height = parseInt(`${size[4]}${size[5]}${size[6]}`, 10);

  if (horizontal) {
    const auxWidth = width;
    const auxHeight = height;

    width = auxHeight;
    height = auxWidth;
  }

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

  return { w: width, h: height, p: phone };
};
