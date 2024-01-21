import { type usePlatform } from "$store/sdk/usePlatform.tsx";
import CartShopify from "$store/components/minicart/shopify/Cart.tsx";

export interface Props {
  platform: ReturnType<typeof usePlatform>;
}

function Section({ platform, cart }: Props) {
  if (platform === "shopify") {
    return <CartShopify cart={cart} />;
  }

  return <div>Not Implemented!</div>;
}

export default Section;
