import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import Avatar from "../../components/ui/Avatar.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
}

const WIDTH = 200;
const HEIGHT = 279;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  platform,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const relativeUrl = relative(url);
  const skuSelector = variants.map(([value, link]) => {
    const relativeLink = relative(link);
    return (
      <li>
        <a href={relativeLink}>
          <Avatar
            variant={relativeLink === relativeUrl
              ? "active"
              : relativeLink
              ? "default"
              : "disabled"}
            content={value}
          />
        </a>
      </li>
    );
  });
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  return (
    <div
      id={id}
      class={`card card-compact group w-full ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}

        <div
          class={`absolute top-2 z-10 flex items-center
            ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
            
          `}
        >
          <div
            class={`${l?.hide?.favoriteIcon ? "hidden" : "block"} ${
              l?.onMouseOver?.showFavoriteIcon ? "lg:group-hover:block" : ""
            }`}
          >
            {platform === "vtex" && (
              <WishlistButtonVtex
                productGroupID={productGroupID}
                productID={productID}
              />
            )}
            {platform === "wake" && (
              <WishlistButtonWake
                productGroupID={productGroupID}
                productID={productID}
              />
            )}
          </div>
          {/* Discount % */}
          {!l?.hide?.discount && (
            <div class="text-sm bg-base-100 p-[10px]">
              <span class="text-base-content font-bold">
                {listPrice && price
                  ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
                  : ""}
              </span>
              OFF
            </div>
          )}
        </div>

        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded w-full ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector
              ? (
                ""
              )
              : (
                <ul
                  class={`flex items-center gap-2 w-full overflow-auto p-3 ${
                    align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
          </>
        )}

        {l?.hide?.productName && l?.hide?.productDescription
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-0">
              {l?.hide?.productName
                ? (
                  ""
                )
                : (
                  <h2
                    class="truncate text-base lg:text-lg text-base-content uppercase font-normal"
                    dangerouslySetInnerHTML={{ __html: name ?? "" }}
                  />
                )}
              {l?.hide?.productDescription
                ? (
                  ""
                )
                : (
                  <div
                    class="truncate text-sm lg:text-sm text-neutral"
                    dangerouslySetInnerHTML={{ __html: description ?? "" }}
                  />
                )}
            </div>
          )}
        {l?.hide?.allPrices
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-2">
              <div
                class={`flex flex-col gap-0 ${
                  l?.basics?.oldPriceSize === "Normal"
                    ? "lg:flex-row-reverse lg:gap-2"
                    : ""
                } ${align === "center" ? "justify-center" : "justify-end"}`}
              >
                <div
                  class={`line-through text-base-300 text-xs font-light ${
                    l?.basics?.oldPriceSize === "Normal" ? "lg:text-sm" : ""
                  }`}
                >
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
                <div class="text-base-content lg:text-sm font-light">
                  {formatPrice(price, offers?.priceCurrency)}
                </div>
              </div>
            </div>
          )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            <ul
              class={`flex items-center gap-2 w-full ${
                align === "center" ? "justify-center" : "justify-between"
              } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
            >
              {l?.hide?.installments
                ? (
                  ""
                )
                : (
                  <li>
                    <span class="text-base-300 font-light text-sm truncate">
                      ou {installments}
                    </span>
                  </li>
                )}
              {l?.hide?.skuSelector
                ? (
                  ""
                )
                : (
                  <li>
                    <ul class="flex items-center gap-2">{skuSelector}</ul>
                  </li>
                )}
            </ul>
          </>
        )}
        {!l?.hide?.cta
          ? (
            <div
              class={`flex-auto flex items-end ${
                l?.onMouseOver?.showCta ? "lg:hidden" : ""
              }`}
            >
              {cta}
            </div>
          )
          : (
            ""
          )}
      </div>
    </div>
  );
}

export default ProductCard;
