import type {
  ToAnalyticsProps,
  ToAddToCart,
  ToRemoveFromCart,
  ToViewItem,
  ToSelectPromotion,
  AnalyticsEventTypes,
} from "../types/index.ts"

import { toAnalyticsItems, getTotalValue } from "./toAnalyticsItems.ts"

type HandlerReturnTypes = {
  add_to_cart: ReturnType<typeof toAddToCart>
  remove_from_cart: ReturnType<typeof toRemoveFromCart>
  view_item: ReturnType<typeof toViewItem>
  select_promotion: ReturnType<typeof toSelectPromotion>
}

const toAddToCart = (data: ToAddToCart) => {
  const items = toAnalyticsItems({ items: data.items, extended: data.extended })
  const value = getTotalValue(items)

  return {
    name: "add_to_cart" as const,
    params: {
      currency: data.extended.currency ?? "BRL",
      value,
      items,
    },
  }
}

const toRemoveFromCart = (data: ToRemoveFromCart) => {
  const items = toAnalyticsItems({ items: data.items, extended: data.extended })
  const value = getTotalValue(items)

  return {
    name: "remove_from_cart" as const,
    params: {
      currency: data.extended.currency ?? "BRL",
      value,
      items,
    },
  }
}

const toViewItem = (data: ToViewItem) => {
  const items = toAnalyticsItems({ items: data.items, extended: data.extended })
  const value = getTotalValue(items)

  return {
    name: "view_item" as const,
    params: {
      currency: data.extended.currency ?? "BRL",
      value,
      items,
    },
  }
}

const toSelectPromotion = (data: ToSelectPromotion) => {
  const items =
    data.items &&
    data.extended &&
    toAnalyticsItems({ items: data.items, extended: data.extended })

  return {
    name: "select_promotion" as const,
    params: {
      promotion_id: data.promotion_id,
      promotion_name: data.promotion_name,
      creative_name: data?.creative_name,
      creative_slot: data?.creative_slot,
      location_id: data?.location_id,
      ...(items ? { items } : {}),
    },
  }
}

const handlers: {
  [T in keyof AnalyticsEventTypes]: (
    data: AnalyticsEventTypes[T]
  ) => HandlerReturnTypes[T]
} = {
  add_to_cart: toAddToCart,
  select_promotion: toSelectPromotion,
  view_item: toViewItem,
  remove_from_cart: toRemoveFromCart,
}

export const toAnalytics = <T extends keyof AnalyticsEventTypes>({
  type,
  data,
}: ToAnalyticsProps<T>) => {
  if (!type) {
    throw new Error("Type is undefined")
  }

  const handler = handlers[type]

  if (!handler) {
    throw new Error(`Unsupported type: ${type}`)
  }

  return handler(data)
}
