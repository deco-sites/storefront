import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useSendEvent } from "../Analytics.tsx";
import Icon from "../ui/Icon.tsx";

export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};

export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}

const QUANTITY_MAX_VALUE = 100;

function CartItem({ item, index, locale, currency }: Props) {
  const { image, listPrice, price = Infinity, quantity } = item;
  const isGift = price < 0.01;

  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;

  const removeFromCartEvent = useSendEvent({
    on: "click",
    event: {
      name: "remove_from_cart",
      params: { items: [item] },
    },
  });

  const decreaseEvent = useSendEvent({
    on: "click",
    event: {
      name: "remove_from_cart",
      params: { items: [{ ...item, quantity: quantity - 1 }] },
    },
  });

  const increaseEvent = useSendEvent({
    on: "click",
    event: {
      name: "add_to_cart",
      params: { items: [{ ...item, quantity: quantity + 1 }] },
    },
  });

  const changeEvent = useSendEvent(
    {
      on: "change",
      event: {
        name: "add_to_cart",
        params: { items: [item] },
      },
      onBeforeSend: (e, target) => ({
        ...e,
        params: {
          ...e.params,
          items: [{
            ...e.params.items[0],
            quantity: Number((target as HTMLInputElement).value),
          }],
        },
      }),
    },
  );

  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class="grid grid-rows-1 gap-2"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <Image
        alt={name}
        src={image}
        style={{ aspectRatio: "108 / 150" }}
        width={108}
        height={150}
        class="h-full object-contain"
      />

      {/* Info */}
      <div class="flex flex-col gap-2">
        {/* Name and Remove button */}
        <div class="flex justify-between items-center">
          <legend>{name}</legend>
          <button
            {...removeFromCartEvent}
            name="action"
            value={`remove::${index}`}
            disabled={isGift}
            class={clx(isGift ? "hidden" : "btn btn-ghost btn-square")}
          >
            <Icon id="Trash" size={24} />
          </button>
        </div>

        {/* Price Block */}
        <div class="flex items-center gap-2">
          <span class="line-through text-sm">
            {formatPrice(listPrice, currency, locale)}
          </span>
          <span class="text-sm text-secondary">
            {isGift ? "Grátis" : formatPrice(price, currency, locale)}
          </span>
        </div>

        {/* Quantity Selector */}
        <div class={clx(isGift ? "hidden" : "join border rounded-none w-min")}>
          <button
            {...decreaseEvent}
            name="action"
            value={`decrease::${index}`}
            class="btn btn-square btn-ghost join-item"
            disabled={quantity <= 1}
          >
            -
          </button>
          <div
            class="has-[:invalid]:tooltip has-[:invalid]:tooltip-error has-[:invalid]:tooltip-open has-[:invalid]:tooltip-bottom"
            data-tip="Quantity must be higher than 1"
          >
            <input
              {...changeEvent}
              name={`item::${index}`}
              class={clx(
                "input text-center join-item [appearance:textfield]",
                "invalid:input-error",
              )}
              type="number"
              inputMode="numeric"
              max={QUANTITY_MAX_VALUE}
              min={1}
              value={quantity}
              maxLength={3}
              size={3}
            />
          </div>
          <button
            {...increaseEvent}
            name="action"
            value={`increase::${index}`}
            class="btn btn-square btn-ghost join-item"
            disabled={quantity >= QUANTITY_MAX_VALUE}
          >
            +
          </button>
        </div>
      </div>
    </fieldset>
  );
}

export default CartItem;
