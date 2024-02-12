// deno-lint-ignore-file no-explicit-any
// TODO(@ItamarRocha): Import these from the other Product definition
export interface Content {
  name: string;
  props: {
    url: string;
    request: string;
  };
  response: string | Product[];
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
  hasVariant: Product[];
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

export interface BaseMessage {
  type: string;
  role: "user" | "assistant";
}

export interface UserMsg extends BaseMessage {
  content: (MessageContentText | MessageContentFile | MessageContentAudio)[];
}

export interface AssistantMsg extends BaseMessage {
  content: Content[];
  messageId?: string;
}

export type Message = UserMsg | AssistantMsg;

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

export interface Ids {
  threadId: string;
  assistantId: string;
}
