import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { INavItem } from "./LpNavItem.tsx";
import NavItem from "$store/components/header/Lp/LpNavItem.tsx";
import MenuButton from "$store/islands/Header/Lp/LpMenuButton.tsx";

export interface NavbarProps {
  items?: INavItem[];
  logo?: { src: ImageWidget; alt?: string };
  buildBy?: {
    text?: string;
    src: ImageWidget;
    alt?: string;
  };
  hrefLogin?: string;
}
export default function Navbar({
  items = [] as INavItem[],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3290/174fea61-a398-4859-a61a-635cbdabd9f0",
    alt: "Logo",
  },
  buildBy = {
    text: "built by",
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2177/cfba99a4-3e59-41f9-aae1-1177f493bb3d",
    alt: "Logo",
  },
  hrefLogin,
}: NavbarProps) {
  return (
    <>
      {/* Mobile Version */}
      <div class="md:hidden flex flex-row justify-between items-center w-full px-2 py-5 gap-2 h-[70px]">
        {items.length > 0 && <MenuButton />}
        {logo && (
          <a
            href="/"
            class="w-full flex justify-center items-center min-h-[70px]"
            aria-label="Store logo"
          >
            <Image
              width={120}
              height={39}
              class="h-full w-[120px]"
              src={logo.src}
              alt={logo.alt}
            />
          </a>
        )}
      </div>

      {/* Desktop Version */}
      <div class="hidden container mx-auto md:flex flex-row justify-center lg:justify-between items-center w-full md:px-8 py-6">
        <div class="flex-none">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block pr-3 lg:pr-4"
            >
              <Image
                width={120}
                height={39}
                class="h-full w-[120px] object-contain"
                src={logo.src}
                alt={logo.alt}
              />
            </a>
          )}
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex items-center gap-2">
          {buildBy && (
            <>
              {buildBy.text}
              <Image
                width={57}
                height={16}
                src={buildBy.src}
                alt={buildBy.alt}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
