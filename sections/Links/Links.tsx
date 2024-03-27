import { JSX } from "preact";
import { Link, Social, Symbol } from "./types.ts";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export default function Main(
  props: { social?: Social[]; links?: Link[] },
): JSX.Element | null {
  const { social, links } = props;

  function isImage(icon: AvailableIcons | Symbol): icon is Symbol {
    return (icon as Symbol).src !== undefined;
  }

  function isLink(list: Link | Symbol): list is Link {
    return (list as Link).href !== undefined;
  }

  return (
    <div class="flex flex-col items-center max-w-[688px] mx-auto w-full lg:px-0 px-6">
      {social && social?.length > 0 && (
        <ul class="flex flex-row gap-4 items-center justify-center my-8">
          {social?.map((link) => (
            <li>
              <a
                target="_blank"
                href={link.href}
                title={link.label}
              >
                <Icon
                  size={20}
                  id={link.label}
                  strokeWidth={2}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
      {links && links?.length > 0 && (
        <ul class="flex flex-col items-center justify-center w-full">
          {links?.map((list: Link | Symbol, index: number) => {
            if (isLink(list)) {
              return (
                <li class="w-full my-2" key={index}>
                  <a
                    target="_blank"
                    href={list.href}
                    class={`flex min-h-[52px] items-center justify-start px-2 rounded-full border border-base-content w-full bg-base-100`}
                  >
                    {list.icon && !isImage(list.icon) && (
                      <Icon
                        size={20}
                        id={list.icon}
                        strokeWidth={2}
                        class="min-w-[36px]"
                      />
                    )}

                    {list.icon && isImage(list.icon) && (
                      <Image
                        src={list.icon.src || ""}
                        alt={list.icon.alt}
                        width={list.icon.width || 36}
                        height={list.icon.height || 36}
                      />
                    )}
                    <span class="text-center text-sm w-full text-base-content">
                      {list.text}
                    </span>

                    <Icon
                      size={20}
                      id="share"
                      strokeWidth={2}
                      class="group-hover:opacity-100 opacity-0"
                    />
                  </a>
                </li>
              );
            } else {
              return (
                <Image
                  src={list.src || ""}
                  alt={list.alt}
                  width={list.width || 688}
                  height={list.height || 344}
                />
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
