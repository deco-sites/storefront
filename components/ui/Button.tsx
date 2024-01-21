import { clx } from "$store/sdk/clx.ts";
import type { JSX } from "preact";

export type Props = JSX.IntrinsicElements["button"];

const Button = ({
  type = "button",
  class: _class = "",
  disabled,
  children,
  ...props
}: Props) => (
  <button
    hx-disabled-elt="this"
    class={clx("btn no-animation", `${_class}`)}
    disabled={disabled}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
