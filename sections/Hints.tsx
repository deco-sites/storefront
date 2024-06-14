import { AppContext } from "../apps/site.ts";

export function loader(_: null, __: Request, ctx: AppContext) {
  const fonts = [
    "https://fonts.gstatic.com/s/intertight/v7/NGSwv5HMAFg6IuGlBNMjxLsH8ahuQ2e8.woff2",
  ];
  fonts.forEach((font) => {
    ctx.response.headers.append(
      "link",
      `<${font}>; rel=preload; as=font; crossorigin`,
    );
  });
}

export default function Hints() {
  return null;
}
