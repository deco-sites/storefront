import { usePlatform } from "../usePlatform.tsx";
import { useAddToCart as useAddToCartVTEX } from "./vtex.ts";

interface Props {
  seller: string;
  productID: string;
}

export const useAddToCart = ({ seller, productID }: Props) => {
  const platform = usePlatform();

  if (platform === "vtex") {
    return useAddToCartVTEX(seller, productID);
  }

  throw new Error(`Unsupported platform: ${platform}`);
};
