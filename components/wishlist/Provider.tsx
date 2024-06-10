import { useScript } from "apps/utils/useScript.ts";
import { AppContext } from "../../apps/site.ts";
import { WISHLIST_FORM_ID } from "../../constants.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Wishlist {
  productIDs: string[];
}

export const action = async (_: unknown, req: Request, ctx: AppContext) => {
  const form = await req.formData();
  const productID = form.get("product-id")?.toString();
  const productGroupID = form.get("product-group-id")?.toString();

  const wishlist = await ctx.invoke(
    "site/actions/wishlist/submit.ts",
    { productID, productGroupID },
  );

  return { wishlist };
};

const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;
  window.STOREFRONT.WISHLIST.dispatch(form);
};

function WishlistProvider({ wishlist }: { wishlist: Wishlist | null }) {
  return (
    <form
      id={WISHLIST_FORM_ID}
      hx-post={useComponent(import.meta.url)}
      hx-trigger="submit"
      hx-disabled-elt="button[data-wishlist-button]"
    >
      <input type="hidden" name="product-id" />
      <input type="hidden" name="product-group-id" />
      <button hidden />

      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wishlist) }}
      />
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, WISHLIST_FORM_ID),
        }}
      />
    </form>
  );
}

export default WishlistProvider;
