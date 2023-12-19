import type { ComponentChildren } from "preact";

export interface Props {
  position?: "tooltip-bottom" | "tooltip-left" | "tooltip-right";
  dataTip: string;
  children: ComponentChildren;
}

export default function Tooltip(props: Props) {
  const { position, dataTip, children } = props;

  return (
    <div className={`tooltip ${position}`} data-tip={dataTip}>
      {children}
    </div>
  );
}
