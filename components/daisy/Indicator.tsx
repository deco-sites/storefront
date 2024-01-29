import Image from "apps/website/components/Image.tsx";

export interface Props {
  text?: string;
  badgeText?: string;
  avatar?: { src: string; alt: string };
}

export default function Indicator(props: Props) {
  const { text, badgeText, avatar } = props;

  return (
    <div className="indicator">
      <span className="indicator-item badge badge-secondary">
        {badgeText ? badgeText : ""}
      </span>
      <div
        className={`w-20 h-20 rounded-lg ${
          !avatar && "grid bg-base-300 place-items-center"
        }`}
      >
        {!avatar && text}
        {avatar && (
          <Image alt={avatar.alt} src={avatar.src} width={80} height={80} />
        )}
      </div>
    </div>
  );
}
