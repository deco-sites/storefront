import Banner, {
  Props as BannerProps,
} from "../../components/image/ImageBanner.tsx";
import { imgPh, VNode } from "../../constants.tsx";

interface Item {
  banner: BannerProps;
  /** @description which URL should this banner become active. Leave blank for always matching */
  matcher?: string;
}

export interface Props {
  /** @title Items */
  items?: Item[];
}

const ITEMS: Item[] = new Array(4).fill({
  banner: {
    desktop: imgPh["rct-lg"],
    mobile: imgPh["rct-sm"],
    alt: "Placeholder",
  },
});

function loader({ items = ITEMS }: Props, req: Request): VNode[] | null {
  const banners = items.filter(({ matcher }) =>
    matcher ? new URLPattern({ pathname: matcher }).test(req.url) : true
  );

  return banners?.map(({ banner }) => <Banner {...banner} />) ?? null;
}

export default loader;
