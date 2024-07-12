import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  links?: Link[];
  social?: Social[];
  paymentMethods?: Social[];
  policies?: Item[];
  logo?: ImageWidget;
  trademark?: string;
}

function Footer({
  links = [],
  social = [],
  policies = [],
  paymentMethods = [],
  logo,
  trademark,
}: Props) {
  return (
    <footer
      class="px-5 sm:px-0 mt-5 sm:mt-10"
      style={{ backgroundColor: "#EFF0F0" }}
    >
      <div class="container flex flex-col gap-5 sm:gap-10 py-10">
        <ul class="grid grid-flow-row sm:grid-flow-col gap-6 ">
          {links.map(({ title, href, children }) => (
            <li class="flex flex-col gap-4">
              <a class="text-base font-semibold" href={href}>{title}</a>
              <ul class="flex flex-col gap-2">
                {children.map(({ title, href }) => (
                  <li>
                    <a class="text-sm font-medium text-base-400" href={href}>
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div class="flex flex-col sm:flex-row gap-12 justify-between items-start sm:items-center">
          <ul class="flex gap-4">
            {social.map(({ image, href, alt }) => (
              <li>
                <a href={href}>
                  <Image
                    src={image}
                    alt={alt}
                    loading="lazy"
                    width={24}
                    height={24}
                  />
                </a>
              </li>
            ))}
          </ul>
          <ul class="flex flex-wrap gap-2">
            {paymentMethods.map(({ image, alt }) => (
              <li class="h-8 w-10 border border-base-100 rounded flex justify-center items-center">
                <Image
                  src={image}
                  alt={alt}
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        <hr class="w-full text-base-400" />

        <div class="grid grid-flow-row sm:grid-flow-col gap-8">
          <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
            {policies.map(({ title, href }) => (
              <li>
                <a class="text-xs font-medium" href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>

          <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4">
            <div>
              <img loading="lazy" src={logo} />
            </div>
            <span class="text-xs font-normal text-base-400">{trademark}</span>
          </div>

          <div class="flex flex-nowrap items-center justify-center gap-4">
            <span class="text-sm font-normal text-base-400">Powered by</span>
            <PoweredByDeco />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
