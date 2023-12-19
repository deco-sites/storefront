export interface Props {
  title: string;
  subtitle: string;
}

export default function Collapse(props: Props) {
  const { title, subtitle } = props;

  return (
    <div tabIndex={0} className="collapse bg-base-200">
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
