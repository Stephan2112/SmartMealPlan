import { DEFAULT_GOALS, MEAL_TYPES } from '@/shared/lib/constants'
import { Product } from '@/entities/Product/types'
import { UserHistoryAction } from '../../history/types'

export interface RemainingNutrients {
  calories: number
  protein: number
  fat: number
  carbs: number
}

export interface HistoryItem {
  product_id: string
  action: UserHistoryAction
}

const ACTION_WEIGHTS: Record<UserHistoryAction, number> = {
  ordered: 2,
  liked: 1.5,
  viewed: 0.8,
}

export function adjustGoalsWithRemaining(
  base = DEFAULT_GOALS,
  remaining?: RemainingNutrients,
): RemainingNutrients {
  if (!remaining) return base
  return {
    calories: base.calories + (remaining.calories ?? 0),
    protein: base.protein + (remaining.protein ?? 0),
    fat: base.fat + (remaining.fat ?? 0),
    carbs: base.carbs + (remaining.carbs ?? 0),
  }
}

export function rankProductsByHistory(products: Product[], history: HistoryItem[]): Product[] {
  if (!history?.length) return products
  const historyMap = history.reduce<Record<string, number>>((acc, item) => {
    acc[item.product_id] = (acc[item.product_id] ?? 0) + ACTION_WEIGHTS[item.action]
    return acc
  }, {})

  return [...products].sort((a, b) => (historyMap[b.id] ?? 0) - (historyMap[a.id] ?? 0))
}

export function selectProductsForMeal(
  mealType: Product['meal_type'],
  mealTargets: RemainingNutrients,
  products: Product[],
  history: HistoryItem[] = [],
) {
  const mealProducts = rankProductsByHistory(products.filter((p) => p.meal_type === mealType), history)
  let remaining = { ...mealTargets }
  const chosen: Product[] = []

  for (const product of mealProducts) {
    if (remaining.calories <= 0 || remaining.protein <= 0) break
    chosen.push(product)
    remaining = {
      calories: remaining.calories - product.nutrients.calories,
      protein: remaining.protein - product.nutrients.protein,
      fat: remaining.fat - product.nutrients.fat,
      carbs: remaining.carbs - product.nutrients.carbs,
    }
    if (chosen.length >= 1) break
  }

  if (!chosen.length && mealProducts[0]) {
    chosen.push(mealProducts[0])
  }

  return { products: chosen, remaining }
}

export function selectDailyProducts(
  userGoals: RemainingNutrients,
  history: HistoryItem[],
  availableProducts: Product[],
  previousDayRemaining?: RemainingNutrients,
) {
  const adjustedGoals = adjustGoalsWithRemaining(userGoals, previousDayRemaining)
  const perMealTarget = {
    calories: adjustedGoals.calories / MEAL_TYPES.length,
    protein: adjustedGoals.protein / MEAL_TYPES.length,
    fat: adjustedGoals.fat / MEAL_TYPES.length,
    carbs: adjustedGoals.carbs / MEAL_TYPES.length,
  }

  const result = MEAL_TYPES.map((meal) => {
    const selection = selectProductsForMeal(meal, perMealTarget, availableProducts, history)
    return {
      mealType: meal,
      items: selection.products,
      remaining: selection.remaining,
    }
  })

  const remainingTotal = result.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.remaining.calories,
      protein: acc.protein + meal.remaining.protein,
      fat: acc.fat + meal.remaining.fat,
      carbs: acc.carbs + meal.remaining.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  )

  return { meals: result, remainingTotal }
}