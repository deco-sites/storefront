import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  type: AlertType;
  text: string;
}

type AlertType =
  | "Alert"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "AlertError";

export default function Alert(props: Props) {
  const { type, text } = props;
  return (
    <div role="alert" className="alert">
      <Icon
        id={type}
        class={type === "Alert"
          ? "stroke-info shrink-0 w-6 h-6"
          : "stroke-current shrink-0 w-6 h-6"}
      />
      <span>{text}</span>
    </div>
  );
}
