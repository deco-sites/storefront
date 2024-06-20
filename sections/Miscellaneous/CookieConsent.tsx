import { useScript } from "deco/hooks/useScript.ts";
import { useId } from "../../sdk/useId.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";

const script = (id: string) => {
  const handleScroll = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);

    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };

  addEventListener("scroll", handleScroll, { once: true });
};

interface Props {
  title?: string;
  text?: HTMLWidget;
  policy?: {
    text?: string;
    link?: string;
  };
  buttons?: {
    allowText: string;
    cancelText?: string;
  };
  layout?: {
    position?: "Expanded" | "Left" | "Center" | "Right";
    content?: "Tiled" | "Piled up";
  };
}

function CookieConsent(
  {
    title = "Cookies",
    text =
      "Guardamos estatísticas de visitas para melhorar sua experiência de navegação.",
    policy = {
      text: "Saiba mais sobre sobre política de privacidade",
      link: "/politica-de-privacidade",
    },
    buttons = {
      allowText: "Aceitar",
      cancelText: "Fechar",
    },
  }: Props,
) {
  const id = useId();

  return (
    <>
      <div
        id={id}
        class={clx(
          "transform-gpu translate-y-[200%] transition fixed bottom-0 w-screen z-50 sm:flex",
          "sm:bottom-2 sm:justify-cente",
        )}
      >
        <div
          class={clx(
            "p-4 mx-4 my-2 flex flex-col gap-4 shadow bg-base-100 rounded border border-base-200",
            "sm:flex-row sm:items-end",
          )}
        >
          <div class={clx("flex-auto flex flex-col gap-4", "sm:gap-2")}>
            <h3 class="text-xl">{title}</h3>
            {text && (
              <div
                class="text-base"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}

            <a href={policy.link} class="text-sm link link-secondary">
              {policy.text}
            </a>
          </div>

          <div class="flex flex-col gap-2">
            <button class="btn" data-button-cc-accept>
              {buttons.allowText}
            </button>
            <button class="btn btn-outline" data-button-cc-close>
              {buttons.cancelText}
            </button>
          </div>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}

export default CookieConsent;
