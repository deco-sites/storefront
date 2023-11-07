export type AnalyticsEventTypes = {
  add_to_cart: ToAddToCart
  select_promotion: ToSelectPromotion
  view_item: ToViewItem
  remove_from_cart: ToRemoveFromCart
}

export type ToAnalyticsProps<T extends keyof AnalyticsEventTypes> = {
  type: T
  data: AnalyticsEventTypes[T]
}

export interface AnalyticsItem {
  item_category: string
  item_id: string
  item_name: string
  affiliation: string
  coupon: string
  currency: string
  discount: number
  index: number
  item_brand: string
  item_list_id: string
  item_list_name: string
  item_variant: string
  location_id: string
  price: number
  quantity: number
}

export interface ProductItem {
  sku: string
  inProductGroupWithID: string
  name: string
  seller: string
  listPrice: number
  price: number
  category: string
  url: string
  brand?: string
  coupon?: string
  variant?: string
  locationID?: string
}

export interface ExtendedProductItem {
  index: number
  view: {
    id: string
    name: string
  }
  quantity: number
  currency?: string
}

export interface ToAnalyticsItemsProps {
  items: ProductItem[]
  extended: ExtendedProductItem
}

export interface ToAddToCart {
  type?: "add_to_cart"
  items: ProductItem[]
  extended: ExtendedProductItem
}

export interface ToRemoveFromCart {
  type?: "remove_from_cart"
  items: ProductItem[]
  extended: ExtendedProductItem
}

export interface ToViewItem {
  type?: "remove_from_cart"
  items: ProductItem[]
  extended: ExtendedProductItem
}

export interface ToSelectPromotion {
  type?: "select_promotion"
  promotion_id: string
  promotion_name: string
  creative_name?: string
  creative_slot?: string
  location_id?: string
  items?: ProductItem[]
  extended?: ExtendedProductItem
}
