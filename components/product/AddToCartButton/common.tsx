import type { ToAddToCart } from "$store/sdk/ga4/types/index.ts";

import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";
import { toAnalytics } from "$store/sdk/ga4/transform/index.ts";

export interface Props {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  url: string;
  onAddItem: () => Promise<void>;
  analytics?: ToAddToCart;
}

const useAddToCart = ({
  price,
  name,
  discount,
  productGroupID,
  productID,
  url,
  onAddItem,
  analytics,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      if (analytics) {
        const add_to_cart = toAnalytics({
          type: "add_to_cart",
          data: analytics,
        });

        sendEvent(add_to_cart);
      }

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button {...btnProps} data-deco="add-to-cart" class="btn-primary">
      Adicionar à Sacola
    </Button>
  );
}
