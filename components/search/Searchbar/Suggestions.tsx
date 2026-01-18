import { Suggestion } from "apps/commerce/types.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import ProductCard from "../../product/ProductCard.tsx";
import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/Slider.tsx";
import { ACTION, NAME } from "./Form.tsx";
import { type Resolved } from "@deco/deco";
export interface Props {
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
}
export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;
  const form = await req.formData();
  const query = `${form.get(NAME ?? "q")}`;
  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;
  return { suggestion };
};
export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;
  const query = new URL(req.url).searchParams.get(NAME ?? "q");
  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;
  return { suggestion };
};
function Suggestions(
  { suggestion }: ComponentProps<typeof loader, typeof action>,
) {
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const hasResults = hasProducts || hasTerms;

  return (
    <div
      class={clx(
        `overflow-y-scroll max-h-[70vh]`,
        !hasResults && "hidden",
      )}
    >
      <div class="gap-6 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[200px_1fr]">
        {/* Search term suggestions */}
        {hasTerms && (
          <div class="flex flex-col gap-4">
            <span
              class="font-semibold text-base text-base-content"
              role="heading"
              aria-level={3}
            >
              Sugestões
            </span>
            <ul class="flex flex-col gap-2">
              {searches.map(({ term }) => (
                <li>
                  <a
                    href={`${ACTION}?${NAME}=${term}`}
                    class="flex gap-3 items-center py-2 px-2 rounded hover:bg-base-200 transition-colors group"
                  >
                    <span class="text-base-content/60 group-hover:text-primary transition-colors">
                      <Icon id="search" size={18} />
                    </span>
                    <span
                      class="text-sm group-hover:text-primary transition-colors"
                      dangerouslySetInnerHTML={{ __html: term }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Product suggestions */}
        {hasProducts && (
          <div class="flex flex-col pt-6 sm:pt-0 gap-4 overflow-x-hidden">
            <span
              class="font-semibold text-base text-base-content"
              role="heading"
              aria-level={3}
            >
              Produtos sugeridos
            </span>
            <Slider class="carousel gap-4">
              {products.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                >
                  <ProductCard
                    product={product}
                    index={index}
                    itemListName="Search Suggestions"
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}
export default Suggestions;
