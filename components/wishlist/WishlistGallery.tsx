import SearchResult, {
  Props as SearchResultProps,
} from "$store/components/search/SearchResult.tsx";
import { FnContext } from "deco/mod.ts";

export type Props = SearchResultProps;

function WishlistGallery(props: ReturnType<typeof loader>) {
  const isEmpty = !props.page || props.page.products.length === 0;

  if (isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">Your wishlist is empty</span>
          <span>
            Log in and add items to your wishlist for later. They will show up
            here
          </span>
        </div>
      </div>
    );
  }

  return <SearchResult {...props} />;
}

export const loader = async (props: Props, _req: Request, ctx: FnContext) => {
  // Figure out a better way to type this loader
  // deno-lint-ignore no-explicit-any
  const invokePayload: any = {
    key: props.page.__resolveType,
    props: {
      ...props.page,
    },
  };

  const page = await invoke(invokePayload) as ProductListingPage | null;

  return {
    ...props,
    page,
    loaderProps: {
      ...props.page,
    },
  };
};

export default WishlistGallery;
