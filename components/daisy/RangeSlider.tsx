export interface Props {
  value?: number;
  min?: number;
  max?: number;
}

export default function RangeSlider(props: Props) {
  const { value, min, max } = props;

  return (
    <input
      type="range"
      min={min ?? 0}
      max={max ?? 100}
      value={value ?? min}
      className="range"
    />
  );
}
