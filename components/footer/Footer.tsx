import Logo from "$store/components/footer/Logo.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Social from "$store/components/footer/Social.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import BackToTop from "$store/components/footer/BackToTop.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { ButtonType, lineColorClasses } from "../../constants.tsx";

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

export interface LayoutOptions {
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  show?: {
    /** @default true */
    logo?: boolean;
    /** @default true */
    newsletter?: boolean;
    /** @default true */
    sectionLinks?: boolean;
    /** @default true */
    socialLinks?: boolean;
    /** @default true */
    paymentMethods?: boolean;
    /** @default true */
    mobileApps?: boolean;
    /** @default true */
    regionOptions?: boolean;
    /** @default true */
    extraLinks?: boolean;
    /** @default true */
    backToTheTop?: boolean;
  };
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
  layoutOptions?: LayoutOptions;
  style?: {
    button?: ButtonType;
    content?: {
      textColor?: keyof typeof lineColorClasses;
    };
  };
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [
    {
      "label": "About",
      "items": [
        {
          "href": "/about-us",
          "label": "About Us",
        },
        {
          "href": "/terms-of-use",
          "label": "Terms of Use",
        },
        {
          "href": "/careers",
          "label": "Careers",
        },
      ],
    },
    {
      "label": "Customer Service",
      "items": [
        {
          "href": "/customer-support",
          "label": "Customer Support",
        },
        {
          "href": "/whatsapp",
          "label": "Contact Us via WhatsApp",
        },
        {
          "href": "/exchange-and-returns",
          "label": "Exchange and Returns",
        },
      ],
    },
  ],
  social = {
    title: "Social links",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Payment methods",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  layoutOptions = {
    variation: "Variation 1",
    show: {
      logo: true,
      newsletter: true,
      sectionLinks: true,
      socialLinks: true,
      paymentMethods: true,
      mobileApps: true,
      regionOptions: true,
      extraLinks: true,
      backToTheTop: true,
    },
  },
  style,
}: Props) {
  const _logo = !layoutOptions?.show?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = !layoutOptions?.show?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      tiled={layoutOptions?.variation == "Variation 4" ||
        layoutOptions?.variation == "Variation 5"}
      btnStyle={style?.button}
    />
  );
  const _sectionLinks = !layoutOptions?.show?.sectionLinks
    ? <></>
    : (
      <FooterItems
        sections={sections}
        justify={layoutOptions?.variation == "Variation 2" ||
          layoutOptions?.variation == "Variation 3"}
      />
    );
  const _social = !layoutOptions?.show?.socialLinks ? <></> : (
    <Social
      content={social}
      vertical={layoutOptions?.variation == "Variation 3"}
    />
  );
  const _payments = !layoutOptions?.show?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _apps = !layoutOptions?.show?.mobileApps
    ? <></>
    : <MobileApps content={mobileApps} />;
  const _region = !layoutOptions?.show?.regionOptions
    ? <></>
    : <RegionSelector content={regionOptions} />;
  const _links = !layoutOptions?.show?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;
  const _divider = (
    <Divider color={lineColorClasses[style?.content?.textColor || "Auto"]} />
  );

  return (
    <>
      <footer class="lg:container lg:mx-auto">
        {(!layoutOptions?.variation ||
          layoutOptions?.variation == "Variation 1") && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_sectionLinks}
              {_newsletter}
            </div>
            {_divider}
            <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
              {_payments}
              {_social}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
                {_apps}
                {_region}
              </div>
            </div>
            {_divider}
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layoutOptions?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
                {_apps}
                {_region}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            {_divider}
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layoutOptions?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                  {_apps}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
                {_region}
              </div>
            </div>
            {_divider}
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layoutOptions?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {!layoutOptions?.show?.newsletter ? <></> : _divider}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                  <div class="lg:flex-auto">
                    {_payments}
                  </div>
                  <div class="lg:flex-auto">
                    {_social}
                  </div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-10">
                  {_region}
                  {_apps}
                </div>
              </div>
            </div>
            {_divider}
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
              {_logo}
              <PoweredByDeco />
            </div>
          </div>
        )}
        {layoutOptions?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {!layoutOptions?.show?.newsletter ? <></> : _divider}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_social}
                {_apps}
              </div>
            </div>
            {_divider}
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <PoweredByDeco />
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
                {_region}
              </div>
            </div>
          </div>
        )}
      </footer>
      {!layoutOptions?.show?.backToTheTop
        ? <></>
        : <BackToTop style={style?.button}>{backToTheTop?.text}</BackToTop>}
    </>
  );
}

export default Footer;