export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'
export type ProductSource = 'yandex_lavka' | 'samokat' | 'internal'

export interface Product {
  id: string
  name: string
  description?: string
  image_url: string
  price: number
  nutrients: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
  meal_type: MealType
  source: ProductSource
  external_id?: string
  external_url?: string
}
