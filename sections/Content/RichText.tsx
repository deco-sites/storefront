import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  text: HTMLWidget;
  containerWidth?: number;
}

export default function RichText({ text, containerWidth }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: text }}
      style={{
        maxWidth: containerWidth ? containerWidth : 1440,
        margin: "0 auto",
      }}
    >
    </div>
  );
}
