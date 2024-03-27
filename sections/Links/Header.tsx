import { Header as HeaderComponent } from "./types.ts";
import Image from "apps/website/components/Image.tsx";
import { JSX } from "preact";

export default function Header(
  props: { header?: HeaderComponent },
): JSX.Element | null {
  const { header } = props;
  if (!header) return null;

  const logo = (
    <Image
      decoding="async"
      src={header.logo?.img || ""}
      alt={header.logo?.alt}
      width={header.logo?.width || 104}
      height={header.logo?.height || 104}
    />
  );

  const maybeLink = header.logo?.link
    ? (
      <a href={header.logo.link} target="_blank">
        {logo}
      </a>
    )
    : logo;

  return (
    <header class="flex flex-col gap-4 items-center justify-center max-w-[746px] mx-auto pt-10 w-full lg:px-0 px-6">
      {header.logo?.img && <div class="p-4 rounded-full">{maybeLink}</div>}
      {header.title && (
        <h1 class="lg:text-6xl text-4xl text-center text-base-content">
          {header.title}
        </h1>
      )}
      {header.description && <p class="text-base-content">{header.description}</p>}
    </header>
  );
}
