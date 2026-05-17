import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy title */
interface FooterLink {
  title: string;
  href: string;
}

/** @titleBy title */
interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/** @titleBy alt */
interface SocialIcon {
  alt: string;
  href: string;
  src: ImageWidget;
}

export interface Props {
  /** @title Colunas de links */
  columns?: FooterColumn[];
  /** @title Redes sociais */
  socialLinks?: SocialIcon[];
  /** @title Logo do footer */
  logo?: ImageWidget;
  /** @title Texto de copyright */
  copyright?: string;
  /** @title Subtítulo copyright */
  copyrightSub?: string;
  /** @title Texto legal do rodapé */
  legalText?: string;
}

export default function HMFooter({
  columns = [
    {
      title: "Serviços ao consumidor",
      links: [
        { title: "Contato", href: "https://store.hermanmiller.com.br/contato" },
        { title: "Condições de venda", href: "https://store.hermanmiller.com.br/condicoes-de-venda" },
        { title: "Acompanhe seu pedido", href: "https://store.hermanmiller.com.br/minha-conta/pedidos" },
        { title: "Envios e Entregas", href: "https://store.hermanmiller.com.br/envios-e-entregas" },
        { title: "Pagamento", href: "https://store.hermanmiller.com.br/pagamento" },
        { title: "Trocas e Devoluções", href: "https://store.hermanmiller.com.br/trocas-e-devolucoes" },
        { title: "Garantia e Serviços", href: "https://store.hermanmiller.com.br/garantia" },
        { title: "Instruções de Montagem", href: "https://store.hermanmiller.com.br/montagem" },
        { title: "Perguntas Frequentes", href: "https://store.hermanmiller.com.br/faq" },
        { title: "Mapa do site", href: "https://store.hermanmiller.com.br/mapa-do-site" },
      ],
    },
    {
      title: "Legal e Privacidade",
      links: [
        { title: "Aviso de Privacidade", href: "https://store.hermanmiller.com.br/privacidade" },
        { title: "Aviso de Cookies", href: "https://store.hermanmiller.com.br/cookies" },
        { title: "Definições de cookies", href: "#" },
      ],
    },
    {
      title: "Localização",
      links: [
        { title: "Showroom", href: "https://store.hermanmiller.com.br/showroom" },
        { title: "Encontre um Distribuidor", href: "https://store.hermanmiller.com.br/distribuidores" },
      ],
    },
    {
      title: "Sobre Herman Miller",
      links: [
        { title: "Quem somos", href: "https://store.hermanmiller.com.br/quem-somos" },
        { title: "Nossos designers", href: "https://store.hermanmiller.com.br/designers" },
        { title: "HermanMiller.com.br", href: "https://www.hermanmiller.com.br" },
      ],
    },
  ],
  socialLinks = [
    { alt: "Facebook", href: "https://www.facebook.com/hermanmillerbrasil", src: "https://store.hermanmiller.com.br/arquivos/facebook-logo-v2.svg" },
    { alt: "Instagram", href: "https://www.instagram.com/hermanmillerbrasil", src: "https://store.hermanmiller.com.br/arquivos/instagram-logo-v2.svg" },
    { alt: "X", href: "https://twitter.com/hermanmiller", src: "https://store.hermanmiller.com.br/arquivos/x-logo-v2.svg" },
    { alt: "YouTube", href: "https://www.youtube.com/hermanmiller", src: "https://store.hermanmiller.com.br/arquivos/youtube-logo-v2.svg" },
    { alt: "LinkedIn", href: "https://www.linkedin.com/company/herman-miller", src: "https://store.hermanmiller.com.br/arquivos/linkedin-logo-v2.svg" },
  ],
  logo = "https://hermanmiller.vtexassets.com/arquivos/logo-herman-miller-footer.png",
  copyright = "© 2025 Herman Miller, Inc. Todos os direitos reservados.",
  copyrightSub = "Parte do Coletivo Millerknoll",
  legalText = "A Loja Online é operada pela Infracommerce Negócios e Soluções em Internet LTDA. CNPJ 15.427.207/0001-14",
}: Props) {
  // first column = newsletter + Serviços; remaining = right side cols
  const [servicesCol, ...rightCols] = columns;

  return (
    <footer class="w-full bg-white border-t border-gray-200 mt-12">

      {/* ── CORPO PRINCIPAL ── */}
      <div class="max-w-screen-xl mx-auto px-6 py-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Col 1: Newsletter + trust logos */}
          <div class="flex flex-col gap-5">
            <h3 class="text-sm font-bold text-black">Assine nossa newsletter</h3>
            <div class="flex">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                class="border border-gray-300 text-sm px-3 py-2 flex-1 min-w-0 outline-none focus:border-black"
              />
              <button
                type="button"
                class="bg-black text-white text-sm font-medium px-4 py-2 hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Assinar
              </button>
            </div>
            <label class="flex items-start gap-2 text-xs text-gray-600 cursor-pointer select-none">
              <input type="checkbox" class="mt-0.5 shrink-0" />
              <span>
                Eu concordo com a{" "}
                <a
                  href="https://store.hermanmiller.com.br/privacidade"
                  class="underline hover:no-underline"
                  style={{ color: "#C8102E" }}
                >
                  Política de Privacidade
                </a>
              </span>
            </label>
            {/* Trust badges */}
            <div class="flex items-center gap-3 flex-wrap mt-1">
              <div class="flex items-center gap-1">
                <span class="text-[9px] text-gray-400 uppercase tracking-tight leading-none">POWERED BY</span>
                <img
                  src="https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/0867399e-a5d0-43bf-a477-d2abff8a580a___2e68259acdd424f6bb51d68b6aecc411.png"
                  alt="VTEX"
                  width={36}
                  height={18}
                  loading="lazy"
                  class="object-contain"
                />
              </div>
              <img
                src="https://hermanmiller.vtexassets.com/arquivos/we-brasil-profissional-logo-v2.svg"
                alt="we.br profissional"
                width={72}
                height={26}
                loading="lazy"
                class="object-contain"
              />
              <img
                src="https://hermanmiller.vtexassets.com/arquivos/reclame-aqui.svg"
                alt="Reclame Aqui"
                width={44}
                height={26}
                loading="lazy"
                class="object-contain"
              />
            </div>
          </div>

          {/* Col 2: Serviços ao consumidor */}
          {servicesCol && (
            <div class="flex flex-col gap-3">
              <h3 class="text-sm font-bold text-black">{servicesCol.title}</h3>
              <ul class="flex flex-col gap-2">
                {servicesCol.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} class="text-sm text-gray-600 hover:text-black hover:underline">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Col 3: Legal + Localização + Sobre (agrupados) */}
          <div class="flex flex-col gap-7">
            {rightCols.map((col) => (
              <div key={col.title} class="flex flex-col gap-2">
                <h3 class="text-sm font-bold text-black">{col.title}</h3>
                <ul class="flex flex-col gap-1.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} class="text-sm text-gray-600 hover:text-black hover:underline">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Col 4: Logo HM + Copyright + Redes sociais */}
          <div class="flex flex-col items-start md:items-end gap-4">
            {logo && (
              <Image
                src={logo}
                alt="Herman Miller"
                width={110}
                height={44}
                loading="lazy"
                class="object-contain"
              />
            )}
            <p class="text-xs text-gray-600 md:text-right leading-snug max-w-[200px]">
              {copyright}
            </p>
            {copyrightSub && (
              <p class="text-xs text-gray-500 md:text-right">{copyrightSub}</p>
            )}
            <div class="flex items-center gap-3 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  aria-label={s.alt}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-500 hover:text-black transition-colors"
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={22}
                    height={22}
                    loading="lazy"
                    class="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── RODAPÉ LEGAL ── */}
      <div class="border-t border-gray-200 py-4 px-6">
        <div class="max-w-screen-xl mx-auto flex items-center gap-4">
          <img
            src="https://hermanmiller.vtexassets.com/arquivos/infracommerce-logo-v2.svg"
            alt="infracommerce"
            width={90}
            height={22}
            loading="lazy"
            class="object-contain shrink-0"
          />
          <p class="text-xs text-gray-500 leading-snug">{legalText}</p>
        </div>
      </div>
    </footer>
  );
}
