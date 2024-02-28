// deno-lint-ignore-file no-explicit-any
import { Product as ProductType } from "apps/commerce/types.ts";

export interface Content {
  name: string;
  props: {
    url: string;
    request: string;
  };
  response: string | ProductType[];
  options?: string[];
}

export interface Product {
  "@type": string;
  category: string;
  productID: string;
  url: string;
  name: string;
  description: string;
  brand: Brand;
  inProductGroupWithID: string;
  sku: string;
  gtin: string;
  releaseDate: number;
  additionalProperty: PropertyValue[];
  isVariantOf?: ProductGroup;
  image: ImageObject[];
  offers: AggregateOffer;
}

export interface Brand {
  "@type": string;
  "@id": string;
  name: string;
}

export interface PropertyValue {
  "@type": string;
  name: string;
  value: string | number;
  valueReference: string;
}

export interface ProductGroup {
  "@type": string;
  productGroupID: string;
  hasVariant: ProductType[];
  url: string;
  name: string;
  additionalProperty: PropertyValue[];
  model: string;
}

export interface ImageObject {
  "@type": string;
  alternateName: string;
  url: string;
  name: string;
}

export interface AggregateOffer {
  "@type": string;
  priceCurrency: string;
  highPrice: number;
  lowPrice: number;
  offerCount: number;
  offers: Offer[];
}

export interface Offer {
  "@type": string;
  price: number;
  seller: string;
  priceValidUntil: string;
  inventoryLevel: InventoryLevel;
  giftSkuIds: any[]; // Precisaria definir o tipo correto
  teasers: any[]; // Precisaria definir o tipo correto
  priceSpecification: UnitPriceSpecification[];
  availability: string;
}

export interface InventoryLevel {
  value: number;
}

export interface UnitPriceSpecification {
  "@type": string;
  priceType: string;
  priceComponentType?: string;
  name?: string;
  description?: string;
  billingDuration?: number;
  billingIncrement?: number;
  price: number;
}

export interface UserMsg {
  type: "message";
  role: "user";
  content: (MessageContentText | MessageContentFile | MessageContentAudio)[];
}

export interface AssistantTextMessage {
  content: MessageContentText[];
  messageId?: string;
  role: "assistant";
  type: "message";
}

export interface AssistantContentMessage {
  content: Content[];
  messageId?: string;
  role: "assistant";
  type: "function_calls" | "start_function_call";
}

export interface AssistantErrorMessage {
  content: Content[];
  messageId?: string;
  role: "assistant";
  type: "error";
}

export type AssistantMessage =
  | AssistantTextMessage
  | AssistantContentMessage
  | AssistantErrorMessage;

export type Message = UserMsg | AssistantMessage;

export interface MessageContentText {
  type: "text";
  value: string;
  options: string[];
}

export interface MessageContentFile {
  type: "file";
  url: string;
  message: string;
}

export interface MessageContentAudio {
  type: "audio";
  url: string;
  text: string;
}

export type MessageContent =
  | MessageContentText
  | MessageContentFile
  | MessageContentAudio
  | Content;

export interface AssistantIds {
  threadId: string;
  assistantId: string;
}
