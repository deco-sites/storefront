import type { ToAnalyticsItemsProps, AnalyticsItem } from "../types/index.ts"

export const getTotalValue = (items: AnalyticsItem[]) => {
  const value = items
    .reduce((acc, { price, quantity }) => acc + (price * quantity ?? 0), 0)
    .toFixed(2)

  return parseFloat(value)
}

const categoriesToAnalytics = (
  categories: string[]
): Record<`item_category${number | ""}`, string> => {
  return categories.slice(0, 5).reduce((result, category, index) => {
    result[`item_category${index === 0 ? "" : index + 1}`] = category
    return result
  }, {} as Record<`item_category${number | ""}`, string>)
}

export function toAnalyticsItems({ items, extended }: ToAnalyticsItemsProps) {
  const analyticsItems = items.map(item => {
    const categories = categoriesToAnalytics(item.category?.split(">") ?? [])

    return {
      item_id: `${item.inProductGroupWithID}_${item.sku}`,
      item_name: item.name,
      item_url: item.url,
      affiliation: item.seller ?? "1",
      coupon: item.coupon ?? "",
      currency: extended?.currency ?? "BRL",
      discount:
        parseFloat((item.listPrice - item.price).toFixed(2)) *
        extended.quantity,
      index: extended.index + 1,
      item_brand: item.brand ?? "",
      item_list_id: extended.view.id,
      item_list_name: extended.view.name,
      item_variant: item.variant ?? "",
      location_id: item.locationID ?? "",
      price: item.price,
      quantity: extended.quantity,
      ...categories,
    }
  })

  return analyticsItems
}
