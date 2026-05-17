export interface Props {
  title?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export default function QuizBanner({
  title = "Descubra a cadeira ideal para você.",
  description = "Encontre a cadeira ideal para o seu corpo e estilo de uso.",
  cta = { label: "Faça o quiz agora", href: "/quiz" },
}: Props) {
  return (
    <div
      class="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-20 py-8 md:py-10 gap-6"
      style="background-color: #6B0020;"
    >
      <div class="text-white">
        <h2 class="text-2xl md:text-4xl font-bold leading-tight">
          {title}
        </h2>
        {description && (
          <p class="text-sm md:text-base mt-1 opacity-90">{description}</p>
        )}
      </div>
      <a
        href={cta.href}
        class="flex-none border border-white text-white text-sm font-medium px-8 py-3 hover:bg-white transition-colors whitespace-nowrap"
        style="hover:color: #6B0020;"
      >
        {cta.label}
      </a>
    </div>
  );
}
