import type { JSX } from "preact";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
    ariaLabel?: string;
  };

function Button({
  type = "button",
  class: _class = "",
  loading,
  disabled,
  ariaLabel,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`btn no-animation ${_class}`}
      disabled={disabled || loading}
      aria-label={ariaLabel || props["aria-label"]}
      type={type}
    >
      {loading ? <span class="loading loading-spinner" /> : children}
    </button>
  );
}

export default Button;
