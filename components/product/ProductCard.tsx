import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;
}

const WIDTH = 200;
const HEIGHT = 279;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
}: Props) {
  const { url, image: images, offers, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];

  const {
    listPrice,
    price,
    installments,
    seller = "1",
    availability,
  } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  return (
    <div
      {...event}
      class="card card-compact group w-full lg:border lg:border-transparent lg:hover:border-inherit lg:p-4"
    >
      <div class="flex flex-col gap-2">
        <figure
          class="relative overflow-hidden"
          style={{ aspectRatio }}
        >
          {/* Wishlist button */}
          <div
            class={clx(
              "absolute top-0 left-0",
              "z-10 w-full",
              "flex items-center justify-end",
            )}
          >
            {/* Discount % */}
            <div class="text-sm px-3">
              <span class="font-bold">
                {listPrice && price
                  ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
                  : ""}
              </span>
              OFF
            </div>
            <div class="lg:group-hover:block">
              <WishlistButton item={item} variant="icon" />
            </div>
          </div>

          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
            class={clx(
              "absolute top-0 left-0",
              "grid grid-cols-1 grid-rows-1",
              "w-full",
            )}
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "bg-base-100",
                "object-cover",
                "rounded w-full",
                "col-span-full row-span-full",
              )}
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "bg-base-100",
                "object-cover",
                "rounded w-full",
                "col-span-full row-span-full",
                "transition-opacity opacity-0 lg:group-hover:opacity-100",
              )}
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          </a>
        </figure>

        {/* SKU Selector */}
        <ul class={clx("flex items-center justify-center gap-4", "min-h-8")}>
          {variants.length > 1 &&
            variants.map(([value, link]) => [value, relative(link)] as const)
              .map(([value, link]) => (
                <li>
                  <a href={link} class="avatar cursor-pointer">
                    <Ring value={value} />
                  </a>
                </li>
              ))}
        </ul>

        {/* Name/Description */}
        <div class="flex flex-col">
          <h2
            class="truncate text-base lg:text-lg uppercase"
            dangerouslySetInnerHTML={{ __html: title ?? "" }}
          />

          <div
            class="truncate text-xs"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          />
        </div>

        {/* Price from/to */}
        <div class="flex gap-2 items-center justify-end font-light">
          <span class="line-through text-sm">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
          <span>
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>

        {/* Installments */}
        <span class="flex justify-end gap-2 font-light text-sm truncate">
          ou {installments}
        </span>

        {availability === "https://schema.org/InStock" && (
          <AddToCartButton product={product} seller={seller} item={item} />
        )}
      </div>
    </div>
  );
}

export default ProductCard;
