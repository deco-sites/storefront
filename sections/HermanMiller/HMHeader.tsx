import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

/** @titleBy text */
export interface AlertItem {
  /** @title Texto do anúncio */
  text: string;
  /** @title Badge (ex: "12 anos de garantia") */
  badge?: string;
  /** @title Link */
  href?: string;
}

/** @titleBy label */
export interface NavLink {
  /** @title Label */
  label: string;
  /** @title URL */
  href: string;
  /** @title Destacar em vermelho */
  highlight?: boolean;
}

export interface Props {
  /** @title Alertas da barra superior */
  alerts?: AlertItem[];
  /** @title Itens de navegação */
  navItems?: NavLink[];
  /** @title Logo */
  logo?: {
    src: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
  };
  /** @title Placeholder da busca */
  searchPlaceholder?: string;
  /** @title URL de busca */
  searchHref?: string;
  /** @title URL de login */
  loginHref?: string;
  /** @title URL do carrinho */
  cartHref?: string;
}

export default function HMHeader({
  alerts = [
    {
      text: "Confira a seleção de produtos em nosso Outlet! Aproveite e pague em 12x sem juros",
      badge: "12 anos de garantia",
      href: "https://store.hermanmiller.com.br/outlet",
    },
  ],
  navItems = [
    { label: "Assentos", href: "https://store.hermanmiller.com.br/Assentos" },
    { label: "Decor & Lifestyle", href: "https://store.hermanmiller.com.br/decor-lifestyle" },
    { label: "Acessórios", href: "https://store.hermanmiller.com.br/acessorios" },
    { label: "Iluminação", href: "https://store.hermanmiller.com.br/iluminacao" },
    { label: "Mesas", href: "https://store.hermanmiller.com.br/mesas" },
    { label: "Gaming", href: "https://store.hermanmiller.com.br/gaming" },
    { label: "Home Office", href: "https://store.hermanmiller.com.br/home-office" },
    { label: "Até 50%", href: "https://store.hermanmiller.com.br/outlet", highlight: true },
    { label: "Blog", href: "https://blog.hermanmiller.com.br" },
  ],
  logo = {
    src: "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/9659faa3-87c7-4c9b-8bdf-68bc3c3fd559___304e766f834cba1faf42132093350c81.svg",
    alt: "Herman Miller",
    width: 160,
    height: 32,
  },
  searchPlaceholder = "Buscar",
  searchHref = "https://store.hermanmiller.com.br/busca",
  loginHref = "https://store.hermanmiller.com.br/login",
  cartHref = "https://store.hermanmiller.com.br/checkout",
}: Props) {
  const alertId = useId();

  return (
    <header class="w-full sticky top-0 z-50 bg-white shadow-sm">

      {/* ── 1. BARRA DE ALERTAS (vermelho) ── */}
      <div
        id={alertId}
        class="relative w-full text-white text-sm"
        style={{ backgroundColor: "#C8102E" }}
      >
        <Slider class="carousel carousel-center w-full">
          {alerts.map((alert, i) => (
            <Slider.Item
              key={i}
              index={i}
              class="carousel-item w-full flex items-center justify-center gap-3 px-12 py-2 min-h-[40px]"
            >
              <a
                href={alert.href ?? "#"}
                class="flex items-center justify-center gap-3 text-white no-underline"
              >
                <span class="text-sm text-center leading-snug">{alert.text}</span>
                {alert.badge && (
                  <span class="shrink-0 border border-white text-white text-xs font-semibold px-3 py-1 whitespace-nowrap">
                    {alert.badge}
                  </span>
                )}
              </a>
            </Slider.Item>
          ))}
        </Slider>

        {alerts.length > 1 && (
          <>
            <div class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              <Slider.PrevButton class="text-white/80 hover:text-white text-xl leading-none px-1" disabled={false}>
                ‹
              </Slider.PrevButton>
            </div>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              <Slider.NextButton class="text-white/80 hover:text-white text-xl leading-none px-1" disabled={false}>
                ›
              </Slider.NextButton>
            </div>
          </>
        )}
        <Slider.JS rootId={alertId} interval={5000} infinite />
      </div>

      {/* ── 2. TOPO: país | login + carrinho ── */}
      <div class="w-full bg-white border-b border-gray-100">
        <div class="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-1">
          <a href="https://store.hermanmiller.com.br" class="flex items-center gap-1 text-xs text-gray-500 hover:text-black">
            <span class="text-base">🇧🇷</span>
            <span>Brasil</span>
          </a>
          <div class="flex items-center gap-5">
            <a href={loginHref} class="text-xs text-gray-600 hover:text-black font-medium">
              Entrar
            </a>
            <a href={cartHref} aria-label="Carrinho" class="text-gray-600 hover:text-black">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── 3. BARRA PRINCIPAL: logo + nav + busca ── */}
      <div class="w-full bg-white border-b border-gray-200">
        <div class="max-w-screen-xl mx-auto flex items-center gap-6 px-6 py-3">
          {/* Logo */}
          <a href="https://store.hermanmiller.com.br" class="shrink-0" aria-label={logo.alt ?? "Herman Miller"}>
            <Image
              src={logo.src}
              alt={logo.alt ?? "Herman Miller"}
              width={logo.width ?? 160}
              height={logo.height ?? 32}
              loading="eager"
            />
          </a>

          {/* Nav */}
          <nav class="hidden lg:flex flex-1 items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                class={`text-sm px-3 py-2 whitespace-nowrap hover:underline transition-colors ${
                  item.highlight ? "font-bold" : "font-medium text-gray-800"
                }`}
                style={item.highlight ? { color: "#C8102E" } : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search */}
          <a
            href={searchHref}
            class="flex items-center gap-2 border border-gray-300 px-3 py-2 min-w-[200px] text-sm text-gray-400 hover:border-gray-500 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>{searchPlaceholder}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
