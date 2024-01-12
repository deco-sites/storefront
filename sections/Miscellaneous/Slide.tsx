import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface SlideProps {
  label?: string;
  icon?: AvailableIcons;
}

export interface Props {
  content?: SlideProps[];
}

export default function Slide({
  content,
}: Props) {
  const slideContent = content?.map(({ label, icon }) => (
    <div class="flex items-center gap-x-10 mx-4">
      <span class="text-sm font-extralight text-base-content whitespace-nowrap">
        {label}
      </span>
      {icon && (
        <Icon
          id={icon}
          name={icon}
          width={24}
          height={24}
        />
      )}
    </div>
  ));
  return (
    <div class="bg-warning relative w-full overflow-hidden h-11">
      <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-11">
        {slideContent}
        {slideContent}
      </div>
    </div>
  );
}
