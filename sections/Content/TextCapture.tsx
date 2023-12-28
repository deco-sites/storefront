export interface CTA {
  href: string;
  text: string;
  variant: "Normal" | "Reverse";
}
export interface TextCaptureProps {
  text: string;
  cta: CTA[];
}

export default function TextCapture({ text, cta }: TextCaptureProps) {
  return (
    <div class="bg-[#EAFAF2] py-16 md:py-28">
      <section class="xl:container mx-auto flex flex-col items-center justify-center gap-8">
        <h1 class="text-center text-[36px] md:text-[56px] font-bold text-[#181212] md:max-w-2xl">
          {text}
        </h1>
        <div class="flex flex-col lg:flex-row gap-4">
          {cta?.map((item) => (
            <a
              class={`rounded-full text-lg py-4 px-8 font-semibold transition-colors duration-200 cursor-pointer ${
                item?.variant === "Reverse"
                  ? "border border-[#181212] bg-[#181212] text-[#FFF] hover:bg-[#FFF] hover:text-[#000]"
                  : "border border-[#C9CFCF] bg-[#FFF] text-[#000]  hover:bg-[#C9CFCF]"
              }`}
            >
              {item?.text}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
