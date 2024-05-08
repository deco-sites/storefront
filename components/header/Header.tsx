import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import { AppContext } from "../../apps/site.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import Alert from "./Alert.tsx";
import Drawers from "./Drawers.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface Props {
  alerts?: string[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;
}

function Header({
  alerts,
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <header style={{ height: headerHeight }}>
      <Drawers menu={{ items }} platform={platform}>
        <div class="bg-base-100 fixed w-full z-50">
          {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
          <Navbar device={device} items={items} logo={logo} />
        </div>
      </Drawers>
    </header>
  );
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
