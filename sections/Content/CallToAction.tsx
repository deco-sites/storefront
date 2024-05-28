export interface CTA {
  id?: string;
  href: string;
  text: string;
  variant: "Normal" | "Reverse";
}

export interface Props {
  text: string;
  cta: CTA[];
}

export default function CallToAction({ text = "Call to Action", cta }: Props) {
  return (
    <div class="py-16 md:py-28">
      <section class="xl:container mx-auto flex flex-col items-center justify-center gap-8 mb-16 lg:mb-0 z-10">
        <h2 class="mx-6 lg:mx-0 text-center text-[36px] md:text-[80px] leading-[100%] font-medium max-w-4xl z-10">
          {text}
        </h2>
        <div class="flex flex-col md:flex-row gap-4 z-20">
          {cta?.map((item) => (
            <a
              key={item?.id}
              id={item?.id}
              href={item?.href}
              target={item?.href.includes("http") ? "_blank" : "_self"}
              class={`group relative overflow-hidden rounded-full hover:bg-gradient-to-r px-6 py-2 lg:px-8 lg:py-3 transition-all duration-300 ease-out ${
                item.variant === "Reverse"
                  ? "bg-secondary text-white"
                  : "bg-accent text-black"
              }`}
            >
              <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40">
              </span>
              <span class="relative font-medium lg:text-[20px]">
                {item?.text}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
