import type { ImageWidget } from "apps/admin/widgets.ts";

export interface ServiceProps {
  /** @description type field - example: Service */
  type?: string;
  /** @description title field */
  label?: string;
  description?: string;
  image: ImageWidget;
  placement: "left" | "right";
}

export interface Props {
  services?: ServiceProps[];
}

const PLACEMENT = {
  left: "flex-col lg:flex-row-reverse",
  right: "flex-col lg:flex-row",
};

export default function Services({
  services = [
    {
      type: "Service",
      label: "Implementação e Customização de Lojas Online",
      description:
        "Desde a criação de lojas virtuais personalizadas, design de UX/UI, até ajustes finos em plataformas existentes, nossos parceiros oferecem soluções completas.",
      image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3290/488e5dc5-9a24-48c9-9795-09b97394fb5f",
      placement: "left",
    },
  ],
}: Props) {
  return (
    <div class="bg-base-000 flex flex-col py-28">
      {services?.map((service, index) => (
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
            alt={service.label}
            decoding="async"
            loading="lazy"
          />
          <div class="w-full lg:w-1/2 flex-1 space-y-2 lg:space-y-4 lg:max-w-xl gap-4">
            {service.type && <p>{service.type}</p>}
            <p class="text-base-000 text-[36px] md:text-[48px] leading-[120%] font-bold">
              {service.label}
            </p>
            <p class="text-base-000 text-[16px] md:text-[18px]">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
