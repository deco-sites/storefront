import { AppContext } from "../apps/site.ts";

export function loader(_: null, __: Request, ctx: AppContext) {
  const fonts = [
    "/live/invoke/website/loaders/asset.ts?src=https://fonts.gstatic.com/s/intertight/v7/NGSwv5HMAFg6IuGlBNMjxLsH8ahuQ2e8.woff2",
  ];
  fonts.forEach((font) => {
    ctx.response.headers.append(
      "link",
      `<${font}>; rel=preload; as=font; type=font/woff2; crossorigin`,
    );
  });
}

export default function Hints() {
  return null;
}
