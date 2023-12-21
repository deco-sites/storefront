export interface Props {
  max: number;
  value?: number;
}

export default function Progress(props: Props) {
  const { value, max } = props;
  return (
    <progress
      className="progress w-full"
      value={value}
      max={max}
    >
    </progress>
  );
}
