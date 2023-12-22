export interface Props {
  children: Child[];
}

interface Child {
  title: string;
  subtitle: string;
}

export default function Accordion(props: Props) {
  const { children } = props;
  return (
    <>
      {children.map((c) => {
        return (
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" />
            <div className="collapse-title text-xl font-medium">{c.title}</div>
            <div className="collapse-content">{c.subtitle}</div>
          </div>
        );
      })}
    </>
  );
}
