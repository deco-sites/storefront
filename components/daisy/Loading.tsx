export interface Props {
  style:
    | "loading-spinner"
    | "loading-dots"
    | "loading-ring"
    | "loading-ball"
    | "loading-bars"
    | "loading-infinity";
  size: "loading-xs" | "loading-sm" | "loading-md" | "loading-lg";
}

export default function Loading(props: Props) {
  const { style, size } = props;

  return (
    <>
      <span className={`loading ${style} ${size}`}></span>
    </>
  );
}
