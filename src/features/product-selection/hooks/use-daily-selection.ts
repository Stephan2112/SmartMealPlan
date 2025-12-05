import { useEffect, useMemo } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { fetchProducts } from '@/entities/Product/api'
import { Product } from '@/entities/Product/types'
import { DEFAULT_GOALS } from '@/shared/lib/constants'
import { selectDailyProducts, RemainingNutrients, HistoryItem } from '../algorithms/selection'

const isRemainingEqual = (a: RemainingNutrients | null, b: RemainingNutrients) => {
  if (!a) return false

  return (
    a.calories === b.calories &&
    a.protein === b.protein &&
    a.fat === b.fat &&
    a.carbs === b.carbs
  )
}

interface SelectionState {
  products: Product[]
  history: HistoryItem[]
  remaining: RemainingNutrients | null
  setRemaining: (value: RemainingNutrients) => void
  setHistory: (items: HistoryItem[]) => void
  setProducts: (items: Product[]) => void
}

const useSelectionStore = create<SelectionState>()(
  persist(
    (set) => ({
      products: [],
      history: [],
      remaining: null,
      setRemaining: (value) => set({ remaining: value }),
      setHistory: (items) => set({ history: items }),
      setProducts: (items) => set({ products: items }),
    }),
    { name: 'smartmealplan-selection' },
  ),
)

export function useDailySelection(userGoals: RemainingNutrients = DEFAULT_GOALS) {
  const { products, history, remaining, setHistory, setProducts, setRemaining } = useSelectionStore()

  useEffect(() => {
    fetchProducts().then((items) => setProducts(items))
  }, [setProducts])

  const { meals, remainingTotal } = useMemo(
    () =>
      selectDailyProducts(
        userGoals,
        history,
        products,
        remaining ?? undefined,
      ),
    [history, products, remaining, userGoals],
  )

  useEffect(() => {
    if (!remaining || !isRemainingEqual(remaining, remainingTotal)) {
      setRemaining(remainingTotal)
    }
  }, [remaining, remainingTotal, setRemaining])

  const toggleLike = (productId: string) => {
    const exists = history.find((item) => item.product_id === productId && item.action === 'liked')
    if (exists) {
      setHistory(history.filter((item) => item.product_id !== productId || item.action !== 'liked'))
    } else {
      setHistory([...history, { product_id: productId, action: 'liked' }])
    }
  }

  return { meals, remainingTotal, toggleLike }
}