export interface Props {
  style: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
  size: "xs" | "sm" | "md" | "lg";
}

//TODO: UPDATE DAISY UI TO VERSION 4
export default function Loading(props: Props) {
  const { style, size } = props;

  return (
    <>
      <span className={`loading loading-${style} loading-${size}`}></span>
    </>
  );
}
