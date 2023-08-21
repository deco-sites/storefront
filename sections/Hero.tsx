import type { Image as DecoImage } from "deco-sites/std/components/types.ts";

/** @title {{{title}}} - {{{href}}} */
export interface Link {
    title: string;
    href: string;
  }
  
export interface Props {
    logo?: DecoImage;
    title?: string;
    /** @format textarea */
    headline?: string;
    links?: Array<Link>;
}

export default function Hero({
    title = "deco.cx",
    logo = "/logo.svg",
    headline = "The digital experience platform that combines performance and personalization for the ultimate sales results.",
    links = [
        { title: "Official website", "href": "https://deco.cx/", },
        { title: "Linkedin", "href": "https://www.linkedin.com/company/deco-cx/", },
        { title: "Discord", "href": "https://deco.cx/discord", },
    ]
}: Props) {
    return (
        <header class="lg:container mx-8 md:mx-16 lg:mx-auto mt-8 md:mt-12 mb-28 text-xl md:text-base">
            <div class="mb-10 md:mb-20">
                <img
                    class="object-cover w-20"
                    src={logo}
                    alt={title}
                />
            </div>
            <div class="font-bold text-3xl lg:text-6xl leading-tight lg:leading-none xl:w-5/6">{headline}</div>
            {!!links?.length && (
                <ul class="mt-8 flex flex-col md:flex-row gap-2 md:gap-4">
                {links.map(({ href, title }) => (
                    <li>
                        <a target="_blank" href={href} aria-label={title} class="link">{title}</a>
                    </li>
                ))}
                </ul>
            )}
        </header>
    )
}