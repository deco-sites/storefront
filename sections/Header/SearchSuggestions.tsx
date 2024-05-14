import { Suggestion } from "apps/commerce/types.ts";
import { Resolved, SectionProps } from "deco/mod.ts";
import type { AppContext } from "../../apps/site.ts";
import Suggestions from "../../components/search/SearchSuggestions.tsx";
import { NAME } from "../../components/search/Searchbar.tsx";

export interface Props {
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

export default function Section(
  props: SectionProps<typeof loader, typeof action>,
) {
  return <Suggestions {...props} />;
}
