import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Service {
  title: string;
  description: string;
  label?: string;
  image: ImageWidget;
  placement: "left" | "right";
}

export interface Props {
  services: Service[];
}

const PLACEMENT = {
  left: "flex-col lg:flex-row-reverse",
  right: "flex-col lg:flex-row",
};

export default function Services({ services }: Props) {
  return (
    <div class="bg-[#FFF] flex flex-col py-28">
      {services.map((service, index) => (
        <div
          key={index}
          class={`flex xl:container xl:mx-auto first:pt-0 py-12 lg:py-28 mx-5 md:mx-10 ${
            PLACEMENT[service.placement]
          } gap-12 md:gap-20 text-left items-center justify-evenly`}
        >
          <img
            class="w-full lg:w-1/2 flex-1 object-cover rounded-xl aspect-[31/21]"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={service.image}
            alt={service.image}
            decoding="async"
            loading="lazy"
          />
          <div class="w-full lg:w-1/2 flex-1 space-y-2 lg:space-y-4 lg:max-w-xl gap-4">
            {service.label && <p>{service.label}</p>}
            <p class="text-[#000] text-[36px] md:text-[48px] leading-[120%] font-bold">
              {service.title}
            </p>
            <p class="text-[#000] text-[16px] md:text-[18px]">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
