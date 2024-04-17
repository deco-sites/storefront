import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

interface Benefit {
  label: string;
  /**
   * @format icon-select
   * @options deco-sites/storefront/loaders/availableIcons.ts
   */
  icon: AvailableIcons;
  description: string;
}

export interface Props {
  /**
   * @default Benefits
   */
  title?: string;
  /**
   * @default Check out the benefits
   */
  description?: string;
  benefits?: Array<Benefit>;
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "Benefits",
    description = "Check out the benefits",
    benefits = [{
      icon: "Truck",
      label: "Entrega em todo Brasil",
      description: "Consulte o prazo no fechamento da compra.",
    }, {
      icon: "Discount",
      label: "15% na primeira compra",
      description: "Aplicado direto na sacola de compras.",
    }, {
      icon: "ArrowsPointingOut",
      label: "Devolução grátis",
      description: "Veja as condições para devolver seu produto.",
    }],
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const benefitLayout = "tiled";

    return (
      <div
        class={`flex gap-4 ${
          showDivider ? "pb-4 lg:pr-8 lg:border-r lg:border-b-0" : ""
        }`}
      >
        <div class="flex-none">
          <Icon
            id={benefit.icon}
            class={"text-base-content"}
            width={36}
            height={36}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
        <div class="flex-auto flex flex-col gap-1 lg:gap-2">
          <div class="text-base lg:text-xl leading-7 text-base-content">
            {benefit.label}
          </div>
          <p class="text-sm leading-5 text-neutral">
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
      <div class="flex flex-col gap-2">
        <h2 class="text-base-content text-center text-3xl font-semibold">
          {title}
        </h2>
        <p class="text-center">{description}</p>
      </div>
      <div class="w-full flex justify-center">
        <div class="flex flex-col gap-4 lg:gap-8 w-full lg:grid grid-flow-col auto-cols-fr">
          {listOfBenefits}
        </div>
      </div>
    </div>
  );
}
