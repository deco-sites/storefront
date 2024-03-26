import { ImageWidget } from "apps/admin/widgets.ts";
import { AvailableIcons } from "../../components/ui/Icon.tsx";

export interface Header {
  /** @description 104px x 104px image recommended */
  logo?: Logo;
  /** @format textarea */
  title?: string;
  /** @format textarea */
  description?: string;
}

export interface Logo {
  img?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
  link?: string;
}

export interface Social {
  href?: string;
  label:
    | "Instagram"
    | "Facebook"
    | "Linkedin"
    | "WhatsApp"
    | "Discord"
    | "Tiktok";
}

export interface Link {
  text?: string;
  href?: string;
  icon?: AvailableIcons | Symbol;
}

export interface Symbol {
  alt?: string;
  src?: ImageWidget;
  width?: number;
  height?: number;
}

export interface Footer {
  url?: string;
  image?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
  text?: string;
}
