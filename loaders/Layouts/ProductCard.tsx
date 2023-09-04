import ProductCard, { Layout } from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

interface Props {
  /**
   * @title Test Product
   * @description This will only be used for previewing this component
   */
  products: Product[] | null;
  /** @title Product Card layout props */
  layout: Layout;
}

/** @title Product Card Layout */
const loader = ({ layout }: Props): Layout => layout;

export const Preview = (props: Props) => {
  const { layout, products } = props;
  const product = products?.[0];

  console.info('FIXME', { props });

  return (
    product
      ? (
        <ProductCard
          layout={layout}
          product={product}
          platform={usePlatform()}
        />
      )
      : <div>Fill products property for enabling preview</div>
  );
};

export default loader;
