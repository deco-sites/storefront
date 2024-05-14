import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useSection } from "deco/hooks/usePartialSection.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { MINICART_CONTAINER_ID } from "../../sdk/useUI.ts";
import { Props as MinicartProps } from "../../sections/Cart/Minicart.tsx";
import { SendEventOnClick } from "../Analytics.tsx";
import Icon from "../ui/Icon.tsx";

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

  useUpdateQuantity: (quantity: number, index: number) => MinicartProps;
  useAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

const QUANTITY_MAX_VALUE = 100;

function CartItem({
  item,
  index,
  locale,
  currency,
  useUpdateQuantity,
  useAnalyticsItem,
}: Props) {
  const removeID = useId();
  const increaseID = useId();
  const decreaseID = useId();
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const analyticsItem = useAnalyticsItem(index);

  return (
    <div
      class="grid grid-rows-1 gap-2"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        src={image.src.replace("55-55", "255-255")}
        style={{ aspectRatio: "108 / 150" }}
        width={108}
        height={150}
        class="h-full object-contain"
      />

      {/* Info */}
      <div class="flex flex-col gap-2">
        {/* Name and Remove button */}
        <div class="flex justify-between items-center">
          <span>{name}</span>
          <button
            id={removeID}
            disabled={isGift}
            class={clx(isGift ? "hidden" : "btn btn-ghost btn-square")}
            hx-disabled-elt="this"
            hx-target={`#${MINICART_CONTAINER_ID}`}
            hx-indicator={`#${MINICART_CONTAINER_ID}`}
            hx-post={useSection({
              props: {
                __resolveType: "site/sections/Cart/Minicart.tsx",
                ...useUpdateQuantity(0, index),
              },
            })}
          >
            <Icon id="Trash" size={24} />
          </button>
        </div>

        {/* Price Block */}
        <div class="flex items-center gap-2">
          <span class="line-through text-sm">
            {formatPrice(list, currency, locale)}
          </span>
          <span class="text-sm text-secondary">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>

        {/* Quantity Selector */}
        <div class={clx(isGift ? "hidden" : "join border rounded-none w-min")}>
          <button
            id={decreaseID}
            class="btn btn-square btn-ghost join-item"
            disabled={quantity <= 1}
            hx-disabled-elt="this"
            hx-target={`#${MINICART_CONTAINER_ID}`}
            hx-indicator={`#${MINICART_CONTAINER_ID}`}
            hx-post={useSection({
              props: {
                __resolveType: "site/sections/Cart/Minicart.tsx",
                ...useUpdateQuantity(quantity - 1, index),
              },
            })}
          >
            -
          </button>
          <input
            class="input text-center join-item [appearance:textfield]"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            max={QUANTITY_MAX_VALUE}
            min={1}
            value={quantity}
            maxLength={3}
            size={3}
            readonly
          />
          <button
            id={increaseID}
            class="btn btn-square btn-ghost join-item"
            hx-disabled-elt="this"
            hx-target={`#${MINICART_CONTAINER_ID}`}
            hx-indicator={`#${MINICART_CONTAINER_ID}`}
            hx-post={useSection({
              props: {
                __resolveType: "site/sections/Cart/Minicart.tsx",
                ...useUpdateQuantity(quantity + 1, index),
              },
            })}
          >
            +
          </button>
        </div>
      </div>

      {/* Analytics events */}
      {analyticsItem
        ? (
          <>
            <SendEventOnClick
              id={removeID}
              event={{
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              }}
            />
            <SendEventOnClick
              id={decreaseID}
              event={{
                name: "remove_from_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: quantity - 1 }],
                },
              }}
            />
            <SendEventOnClick
              id={increaseID}
              event={{
                name: "add_to_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: quantity + 1 }],
                },
              }}
            />
          </>
        )
        : null}
    </div>
  );
}

export default CartItem;
