import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

/**
 * @titleBy title
 */
export interface Card {
  icon?: AvailableIcons;
  /**
   * @format html
   */
  title: string;
  text: string;
}

export interface Props {
  title?: string;
  cards: Card[];
}

function FeatureCard({ icon, title, text }: Card) {
  return (
    <div class="feature-card group group-hover:-translate-y-3">
      {icon && (
        <div class="p-6 rounded-full bg-white text-[#1A1A1A]">
          <Icon id={icon} size={48} />
        </div>
      )}
      <div class="space-y-4 text-center">
        {title && (
          <div
            class="text-2xl font-semibold leading-[110%]"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <p class="leading-[120%]" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
}

const DEFAULT_CARDS = [
  {
    "icon": "Discount" as AvailableIcons,
    "text": ":)",
    "title": "<p>Visit our coupon page!</p>",
  },
  {
    "icon": "Discount" as AvailableIcons,
    "text": ":)",
    "title": "<p>Visit our coupon page!</p>",
  },
  {
    "icon": "Discount" as AvailableIcons,
    "text": ":)",
    "title": "<p>Visit our coupon page!</p>",
  },
];

export default function Features(
  { title = "Feature", cards = DEFAULT_CARDS }: Props,
) {
  return (
    <section class="relative bg-white text-black py-20 max-w-screen">
      <div class="mx-6 lg:container lg:mx-auto flex justify-center items-center flex-col gap-20">
        {title && (
          <h2 class="font-medium text-[36px] lg:text-[72px] leading-[100%] text-center max-w-4xl z-10">
            {title}
          </h2>
        )}
        <div class="features">
          {cards?.map((card) => <FeatureCard {...card} />)}
        </div>
      </div>
    </section>
  );
}
