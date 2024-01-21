import { clx } from "$store/sdk/clx.ts";
import type { JSX } from "preact";

export type Props =
  & Omit<JSX.IntrinsicElements["label"], "loading">
  & {
    loading?: boolean;
  };

const Button = ({
  type = "button",
  class: _class = "",
  loading,
  disabled,
  children,
  ...props
}: Props) => (
  <label
    {...props}
    className={clx("btn no-animation", `${_class}`)}
    disabled={disabled || loading}
    type={type}
    for="minicart-drawer"
  >
    {loading ? <span class="loading loading-spinner" /> : children}
  </label>
);

export default Button;
