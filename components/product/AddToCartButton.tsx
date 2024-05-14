import { AnalyticsEvent } from "apps/commerce/types.ts";
import { JSX } from "preact";
import { useId } from "preact/hooks";
import { clx } from "../../sdk/clx.ts";
import { MINICART_CONTAINER_ID, MINICART_DRAWER_ID } from "../../sdk/useUI.ts";
import { useComponent } from "../../sections/Component.tsx";
import { SendEventOnClick } from "../Analytics.tsx";
import { Props as MinicartProps } from "../minicart/Minicart.tsx";

export interface Props extends JSX.HTMLAttributes<HTMLLabelElement> {
  /** @description: sku name */
  event: AnalyticsEvent;

  minicart: MinicartProps;

  class?: string;
}

function AddToCartButton({ event, minicart, class: _class }: Props) {
  const id = useId();

  return (
    <>
      <label
        id={id}
        for={MINICART_DRAWER_ID}
        data-deco="add-to-cart"
        class={clx("btn no-animation", _class)}
        hx-disabled-elt="this"
        hx-target={`#${MINICART_CONTAINER_ID}`}
        hx-post={useComponent(
          import.meta.resolve("../minicart/Minicart.tsx"),
          minicart,
        )}
      >
        Adicionar à Sacola
      </label>
      <SendEventOnClick event={event} id={id} />
    </>
  );
}

export default AddToCartButton;
