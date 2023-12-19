export interface Props {
  value?: number;
}

export default function RangeSlider(props: Props) {
  const { value } = props;

  return (
    <input
      type="range"
      min={0}
      max="100"
      value={`${value || 0}`}
      className="range"
    />
  );
}
