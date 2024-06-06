import { type Item } from "../components/minicart/Item.tsx";

export type Callback = (sdk: CartSDK) => void;

export interface CartSDK {
  getCart: () => Cart;
  getQuantity: (itemId: string) => number | undefined;
  setQuantity: (itemId: string, quantity: number) => boolean;
  addToCart: (item: Item, platformProps: unknown) => boolean;
  onChange: (cb: Callback) => void;
  restore: () => void;
}

export interface Cart {
  currency: string;
  coupon: string;
  value: string;
  items: Item[];
}

export const cartScript = (id: string) => {
  const createCartSDK = (): CartSDK => {
    const cbs = new Set<Callback>();
    let form: HTMLFormElement | null = null;

    const getCart = (): Cart =>
      JSON.parse(
        decodeURIComponent(
          form?.querySelector<HTMLInputElement>(
            'input[name="storefront-cart"]',
          )?.value || "[]",
        ),
      );

    const sdk: CartSDK = {
      getCart,

      getQuantity: (itemId) =>
        form?.querySelector<HTMLInputElement>(
          `[data-item-id="${itemId}"] input[type="number"]`,
        )?.valueAsNumber,

      setQuantity: (itemId, quantity) => {
        const input = form?.querySelector<HTMLInputElement>(
          `[data-item-id="${itemId}"] input[type="number"]`,
        );

        const item = getCart()?.items.find((item) =>
          // deno-lint-ignore no-explicit-any
          (item as any).item_id === itemId
        );

        if (!input || !item) {
          return false;
        }

        input.value = quantity.toString();
        input.dispatchEvent(new Event("change", { bubbles: true }));

        window.DECO.events.dispatch({
          name: item.quantity < input.valueAsNumber
            ? "add_to_cart"
            : "remove_from_cart",
          params: { items: [{ ...item, quantity }] },
        });

        return true;
      },

      addToCart: (item, platformProps) => {
        const input = form?.querySelector<HTMLInputElement>(
          'input[name="add-to-cart"]',
        );
        const button = form?.querySelector<HTMLButtonElement>(
          `button[name="action"][value="add-to-cart"]`,
        );

        if (!input || !button) {
          return false;
        }

        window.DECO.events.dispatch({
          name: "add_to_cart",
          params: { items: { item } },
        });

        input.value = encodeURIComponent(JSON.stringify(platformProps));
        button.click();

        return true;
      },

      onChange: (cb) => {
        cbs.add(cb);

        if (form) {
          cb(sdk);
        }
      },

      restore: () => {
        form = document.getElementById(id) as HTMLFormElement | null;

        if (!form) {
          globalThis.window.alert(
            "Missing CART container. This is a bug, please report it",
          );
        }

        // run on next tick to decrease blocking time
        new Promise((resolve) => setTimeout(resolve, 0)).then(() => {
          cbs.forEach((cb) => cb(sdk));
        });
      },
    };

    return sdk;
  };

  globalThis.window.STOREFRONT ||= { SEEN: new WeakMap(), CART: null };
  const storefront = globalThis.window.STOREFRONT;

  storefront.CART ||= createCartSDK();
};
