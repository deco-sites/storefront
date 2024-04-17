import ProductCard from "../../components/product/ProductCard.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

interface Props {
  /** @title Product Card layout props */
  layout: unknown;
}

/** @title Product Card Layout */
const loader = ({ layout }: Props): unknown => layout;

export const Preview = (_: Props) => (
  <div class="h-full w-full grid place-items-center">
    <div class="max-w-xs">
      <ProductCard
        platform={usePlatform()}
        product={{
          "@type": "Product",
          "category": "Masculino>Camisetas Gola Lisa",
          "productID": "165",
          "url": "",
          "name": "Product Test",
          "description": "Product Description",
          "brand": {
            "@type": "Brand",
            "@id": "2000000",
            "name": "deco.cx",
          },
          "inProductGroupWithID": "33",
          "sku": "165",
          "gtin": "789456123003305",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "TAMANHO",
              "value": "GG",
              "valueReference": "SPECIFICATION",
            },
          ],
          "isVariantOf": {
            "@type": "ProductGroup",
            "productGroupID": "33",
            "hasVariant": [],
            "name": "Camiseta Masculina Gola Lisa Olive",
            "additionalProperty": [],
          },
          "image": [
            {
              "@type": "ImageObject",
              "alternateName": "test",
              "url":
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/b9e0a819-6a75-47af-84fe-90b44fecda5f",
            },
            {
              "@type": "ImageObject",
              "alternateName": "test",
              "url":
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/b9e0a819-6a75-47af-84fe-90b44fecda5f",
            },
          ],
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "BRL",
            "highPrice": 69.3,
            "lowPrice": 69.3,
            "offerCount": 1,
            "offers": [
              {
                "@type": "Offer",
                "price": 69.3,
                "seller": "1",
                "priceValidUntil": "2024-09-04T13:03:31Z",
                "inventoryLevel": { "value": 10000 },
                "teasers": [],
                "priceSpecification": [
                  {
                    "@type": "UnitPriceSpecification",
                    "priceType": "https://schema.org/ListPrice",
                    "price": 179,
                  },
                  {
                    "@type": "UnitPriceSpecification",
                    "priceType": "https://schema.org/SalePrice",
                    "price": 69.3,
                  },
                ],
                "availability": "https://schema.org/InStock",
              },
            ],
          },
        }}
      />
    </div>
  </div>
);

export default loader;
