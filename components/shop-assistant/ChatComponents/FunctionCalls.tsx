import {
  Content,
  Ids,
  Message,
  MessageContentAudio,
  MessageContentFile,
  MessageContentText,
  Product,
} from "../types/shop-assistant.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import AddToCartButton from "$store/islands/AddToCartButton/vtex.tsx";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import { useChatContext } from "$store/components/shop-assistant/ChatContext.tsx";
import { sendEvent, SendEventOnView } from "$store/sdk/analytics.tsx";
import { useId } from "preact/compat";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { mapProductCategoryToAnalyticsCategories } from "apps/commerce/utils/productToAnalyticsItem.ts";

export const mapProductToAnalyticsItemAssistant = (
  {
    product,
    price,
    listPrice,
    index = 0,
    quantity = 1,
  }: {
    product: Product;
    price?: number;
    listPrice?: number;
    index?: number;
    quantity?: number;
  },
): AnalyticsItem => {
  const { name, productID, inProductGroupWithID, isVariantOf, url } = product;
  const categories = mapProductCategoryToAnalyticsCategories(
    product.category ?? "",
  );

  return {
    item_id: productID,
    item_group_id: inProductGroupWithID,
    quantity,
    price,
    index,
    discount: Number((price && listPrice ? listPrice - price : 0).toFixed(2)),
    item_name: isVariantOf?.name ?? name ?? "",
    item_variant: name,
    item_brand: product.brand?.name ?? "",
    item_url: url,
    ...categories,
  };
};

export function FunctionCalls(
  { messages, assistantIds }: { messages: Message[]; assistantIds: Ids },
) {
  const isFunctionCallContent = (
    content:
      | MessageContentText
      | MessageContentFile
      | MessageContentAudio
      | Content,
  ): content is Content => {
    return (content as Content).response !== undefined;
  };

  const allProducts: Product[] = messages
    .filter((message) => message.type === "function_calls")
    .flatMap((message) =>
      message.content
        .filter(isFunctionCallContent)
        .filter(
          (content) =>
            content.name ===
              "vtex/loaders/intelligentSearch/productList.ts" &&
            content.response.length !== 0,
        )
        .flatMap((content) => content.response as Product[])
    );

  console.log({ allProducts });

  return (
    <>
      {allProducts.length > 0 && (
        <div class="flex max-w-full h-full w-[inherit]">
          <div className="overflow-y-auto overflow-x-auto w-full flex justify-center">
            <div className="hidden lg:block">
              <ProductShelf
                key="shelf"
                products={allProducts}
                assistantIds={assistantIds}
              />
            </div>
            <div className="block lg:hidden max-w-[22rem]">
              <ProductCarousel
                key="carousel"
                products={allProducts}
                assistantIds={assistantIds}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProductShelf(
  { products, assistantIds }: { products: Product[]; assistantIds: Ids },
) {
  const id = useId();
  console.log(products);
  return (
    <div class="flex flex-row lg:flex-col w-auto gap-4 ml-6">
      {products.map((product, index) => (
        <div
          id={id}
          key={index}
          style={{
            animation: `messageAppear 300ms linear ${index * 600}ms`,
            animationFillMode: "backwards",
          }}
        >
          <ProductCard
            key={index}
            product={product}
            assistantIds={assistantIds}
          />
          <SendEventOnView
            id={id}
            event={{
              name: "view_item",
              params: {
                item_list_id: "product",
                item_list_name: "Product",
                assistantId: assistantIds.assistantId,
                assistantThreadID: assistantIds.threadId,
                items: [mapProductToAnalyticsItemAssistant({ product })],
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}

function ProductCard(
  { product, assistantIds }: { product: Product; assistantIds: Ids },
) {
  const { title, description } = extractTitleAndDescription(
    product.description,
  );
  const currency = product.offers.priceCurrency;
  const price = product.offers.offers[0].price;

  return (
    <div class="flex flex-row items-center bg-white gap-4 rounded-2xl text-black p-4">
      <a
        href={product.url}
        target="_self"
        rel="noopener noreferrer"
        class="w-[18rem] flex justify-center"
      >
        <img
          src={product.image[0].url}
          alt={product.name}
          class="w-full h-auto rounded-md"
        />
      </a>
      <div class="flex flex-col w-full h-full space-y-4 py-4 pr-4">
        <a
          href={product.url}
          target="_self"
          rel="noopener noreferrer"
        >
          <p class="text-xs font-semibold">{product.name}</p>
        </a>
        <p class="text-xs overflow-y-auto font-light max-h-16">
          {description}
        </p>
        <div class="flex justify-between items-center">
          <p class="text-lg w-full">
            {translatePriceCurrency(currency)} {transformPrice(price, currency)}
          </p>
          <AddToCartButton
            productID={product.productID}
            seller={product.offers.offers[0].seller}
            eventParams={{ items: [] }}
            onClick={() => {
              sendEvent({
                name: "add_to_cart",
                params: {
                  currency: product.offers.priceCurrency,
                  value: product.offers.offers[0].price,
                  assistantId: assistantIds.assistantId,
                  assistantThreadID: assistantIds.threadId,
                  items: [mapProductToAnalyticsItem({ product })],
                },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ProductCarousel(
  { products, assistantIds }: { products: Product[]; assistantIds: Ids },
) {
  const id = useId();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const product = products[currentProductIndex] as Product;
  const currency = product.offers?.priceCurrency;
  const price = product.offers.offers[0].price;
  const [transition, setTransition] = useState("");

  const handleNextProduct = () => {
    setTransition("nextCard");
    setCurrentProductIndex((
      prevIndex,
    ) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevProduct = () => {
    setTransition("prevCard");
    setCurrentProductIndex((
      prevIndex,
    ) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <style>
        {`@keyframes nextCard {
        from {
          opacity: 0;
          transform: translateX(30%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }`}
        {`@keyframes prevCard {
        from {
          opacity: 0;
          transform: translateX(-30%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }`}
      </style>
      <div class="relative bg-white rounded-2xl flex items-center justify-center h-48 text-black w-full">
        {products.length > 1
          ? (
            <>
              <button
                class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary-90 rounded-full ml-2"
                onClick={handlePrevProduct}
              >
                <Icon
                  id="ChevronLeft"
                  class="text-white p-[0.4rem]"
                  height={24}
                  width={24}
                  strokeWidth={2}
                />
              </button>
              <button
                class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary-90 rounded-full mr-2"
                onClick={handleNextProduct}
              >
                <Icon
                  id="ChevronRight"
                  class="text-white p-[0.4rem]"
                  height={24}
                  width={24}
                />
              </button>
            </>
          )
          : null}
        <div
          class="flex flex-row gap-4 text-black text-xs px-12 py-4 items-center min-h-44 w-full"
          style={{ animation: `${transition} 200ms linear` }}
          key={currentProductIndex}
        >
          <a
            href={product.url}
            target="_self"
            rel="noopener noreferrer"
            class="flex justify-center min-w-[7rem]"
          >
            <img
              src={product.image[0].url}
              alt={product.image[0].name}
              class="w-fit h-24 sm:h-32 max-w-fit rounded-md"
            />
          </a>
          <div id={id} class="flex flex-col gap-4 w-full max-w-[10rem]">
            <a
              href={product.url}
              target="_self"
              rel="noopener noreferrer"
            >
              <h2
                class="font-bold max-w-[8rem] line-clamp-3"
                title={product.name}
              >
                {product.name}
              </h2>
            </a>
            <p class="font-normal">
              {translatePriceCurrency(currency)}{" "}
              {transformPrice(price, currency)}
            </p>
            <AddToCartButton
              productID={product.productID}
              seller={product.offers.offers[0].seller}
              eventParams={{ items: [] }}
              onClick={() => {
                sendEvent({
                  name: "add_to_cart",
                  params: {
                    currency: product.offers.priceCurrency,
                    value: product.offers.offers[0].price,
                    assistantId: assistantIds.assistantId,
                    assistantThreadID: assistantIds.threadId,
                    items: [mapProductToAnalyticsItem({ product })],
                  },
                });
              }}
            />
            <SendEventOnView
              id={id}
              event={{
                name: "view_item",
                params: {
                  item_list_id: "product",
                  item_list_name: "Product",
                  assistantId: assistantIds.assistantId,
                  assistantThreadID: assistantIds.threadId,
                  items: [mapProductToAnalyticsItemAssistant({ product })],
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Helper functions
const extractTitleAndDescription = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const title = doc.querySelector("h1, h2, h3, h4, h5, h6")?.textContent ||
    "";

  const titleElement = doc.querySelector("h1, h2, h3, h4, h5, h6");
  if (titleElement) titleElement.remove();
  const description = doc.body.textContent || "";

  return { title, description };
};

const translatePriceCurrency = (priceCurrency: string) => {
  if (!priceCurrency) return "";
  switch (priceCurrency) {
    case "BRL":
      return "R$";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return priceCurrency;
  }
};

const transformPrice = (price: number, currency: string) => {
  // Example: change 188.7 to 188,70 if currency is BRL, any other currency will be 188.70
  switch (currency) {
    case "BRL":
      return price.toFixed(2).replace(".", ",");
    default:
      return price.toFixed(2);
  }
};
