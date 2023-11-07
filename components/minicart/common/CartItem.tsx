import type {
  ToAddToCart,
  ToRemoveFromCart,
} from "$store/sdk/ga4/types/index.ts";

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";
import { toAnalytics } from "$store/sdk/ga4/transform/index.ts";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;
  analytics?: ToAddToCart | ToRemoveFromCart;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    analytics,
    onUpdateQuantity,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="grid grid-rows-1 gap-2"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        style={{ aspectRatio: "108 / 150" }}
        width={108}
        height={150}
        class="h-full object-contain"
      />

      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <span>{name}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square"
            onClick={withLoading(async () => {
              await onUpdateQuantity(0, index);

              if (analytics) {
                const analyticsItem = analytics.items[index];

                const remove_from_cart = toAnalytics({
                  type: "remove_from_cart",
                  data: {
                    items: [analyticsItem],
                    extended: {
                      ...analytics.extended,
                      quantity,
                    },
                  },
                });

                sendEvent(remove_from_cart);
              }
            })}
          >
            <Icon id="Trash" size={24} />
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <span class="line-through text-base-300 text-sm">
            {formatPrice(list, currency, locale)}
          </span>
          <span class="text-sm text-secondary">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>

        <QuantitySelector
          disabled={loading || isGift}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            const diff = quantity - item.quantity;

            await onUpdateQuantity(quantity, index);

            if (analytics) {
              const analyticsItem = analytics.items[index];

              const add_to_cart_or_remove_from_cart = toAnalytics({
                type: diff < 0 ? "remove_from_cart" : "add_to_cart",
                data: {
                  items: [analyticsItem],
                  extended: {
                    ...analytics.extended,
                    quantity: Math.abs(diff),
                  },
                },
              });

              sendEvent(add_to_cart_or_remove_from_cart);
            }
          })}
        />
      </div>
    </div>
  );
}

export default CartItem;
