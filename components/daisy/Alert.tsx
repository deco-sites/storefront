import Icon from "../../components/ui/Icon.tsx";

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
        class={`shrink-0 w-6 h-6 ${
          type === "Alert" ? "stroke-info" : "stroke-current"
        }`}
      />
      <span>{text}</span>
    </div>
  );
}
