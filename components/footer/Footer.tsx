import BackToTop from "../../components/footer/BackToTop.tsx";
import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social from "../../components/footer/Social.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
}: Props) {
  const _logo = <Logo logo={logo} />;
  const _newsletter = (
    <Newsletter
      content={newsletter}
    />
  );
  const _sectionLinks = (
    <FooterItems
      sections={sections}
      justify={false}
    />
  );
  const _social = <Social content={social} />;
  const _payments = <PaymentMethods content={payments} />;
  const _apps = <MobileApps content={mobileApps} />;
  const _region = <RegionSelector content={regionOptions} />;
  const _links = <ExtraLinks content={extraLinks} />;

  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-10 pb-2 md:pb-10 gap-10",
        "bg-primary text-primary-content",
      )}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
            {_logo}
            {_sectionLinks}
            {_newsletter}
          </div>
          <Divider />
          <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
            {_payments}
            {_social}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
              {_apps}
              {_region}
            </div>
          </div>
          <Divider />
          <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
            <PoweredByDeco />
            {_links}
          </div>
        </div>
      </div>
      <BackToTop content={backToTheTop?.text} />
    </footer>
  );
}

export default Footer;
