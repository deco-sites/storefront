/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { Suggestion } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
  SEARCHBAR_SUGGESTION_ID,
} from "../../sdk/useUI.ts";

export interface SuggestionProps {
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  suggestion?: Suggestion | null;
}

// When user clicks on the search button, navigate it to
export const ACTION = "/s";
// Querystring param used when navigating the user
export const NAME = "q";

export function Suggestions({ suggestion }: SuggestionProps) {
  const platform = usePlatform();
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  return (
    <div
      id={SEARCHBAR_SUGGESTION_ID}
      class={clx(`overflow-y-scroll`, !hasProducts && !hasTerms && "hidden")}
    >
      <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
        <div class="flex flex-col gap-6">
          <span
            class="font-medium text-xl"
            role="heading"
            aria-level={3}
          >
            Sugestões
          </span>
          <ul class="flex flex-col gap-6">
            {searches.map(({ term }) => (
              <li>
                {/* TODO @gimenes: use name and action from searchbar form */}
                <a
                  href={`${ACTION}?${NAME}=${term}`}
                  class="flex gap-4 items-center"
                >
                  <span>
                    <Icon
                      id="MagnifyingGlass"
                      size={24}
                      strokeWidth={0.01}
                    />
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: term }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
          <span
            class="font-medium text-xl"
            role="heading"
            aria-level={3}
          >
            Produtos sugeridos
          </span>
          <Slider class="carousel">
            {products.map((product, index) => (
              <Slider.Item
                index={index}
                class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
              >
                <ProductCard
                  product={product}
                  platform={platform}
                  index={index}
                  itemListName="Suggeestions"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export interface SearchbarProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
}

const script = (id: string, name: string) => {
  const form = document.getElementById(id) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      globalThis.window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });
};

export function Searchbar(
  { placeholder = "What are you looking for?" }: SearchbarProps,
) {
  return (
    <div
      class="w-full grid gap-8 px-4 py-6 overflow-y-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={SEARCHBAR_INPUT_FORM_ID} action={ACTION} class="join">
        <button
          type="submit"
          class="btn join-item btn-square"
          aria-label="Search"
          for={SEARCHBAR_INPUT_FORM_ID}
          tabIndex={-1}
        >
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
          <Icon
            class="inline [.htmx-request_&]:hidden"
            id="MagnifyingGlass"
            size={24}
            strokeWidth={0.01}
          />
        </button>
        <input
          autofocus
          tabIndex={0}
          class="input input-bordered join-item flex-grow"
          name={NAME}
          placeholder={placeholder}
          role="combobox"
          aria-controls={SEARCHBAR_SUGGESTION_ID}
          aria-haspopup="listbox"
          autocomplete="off"
          hx-post={usePartialSection()["f-partial"]}
          hx-trigger="input changed throttle:300ms, search"
          hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
          hx-target={`#${SEARCHBAR_SUGGESTION_ID}`}
          hx-swap="outerHTML"
        />
        <label
          type="button"
          class="join-item btn btn-ghost btn-square hidden sm:inline-flex"
          for={SEARCHBAR_POPUP_ID}
          aria-label="Toggle searchbar"
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </label>
      </form>

      {/* Suggestions slot */}
      <div id={SEARCHBAR_SUGGESTION_ID} />

      {/* Send search events as the user types */}
      <script
        defer
        src={scriptAsDataURI(script, SEARCHBAR_INPUT_FORM_ID, NAME)}
      />
    </div>
  );
}
