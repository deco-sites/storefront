export interface Props {
  leftContent: string;
  rightContent: string;
  dividerText?: string;
}

export default function Divider(props: Props) {
  const { leftContent, rightContent, dividerText } = props;

  return (
    <div className="flex flex-col w-full lg:flex-row">
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        {leftContent}
      </div>
      <div className="divider lg:divider-horizontal">
        {dividerText ? dividerText : ""}
      </div>
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        {rightContent}
      </div>
    </div>
  );
}
