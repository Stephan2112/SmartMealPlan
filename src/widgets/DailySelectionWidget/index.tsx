import { ProductCard } from '@/shared/ui/ProductCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import { DEFAULT_GOALS } from '@/shared/lib/constants'
import { useDailySelection } from '@/features/product-selection/hooks/use-daily-selection'

export const DailySelectionWidget = () => {
  const { meals, remainingTotal } = useDailySelection(DEFAULT_GOALS)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {meals.map((meal) => (
          <div key={meal.mealType} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold capitalize text-slate-900">{meal.mealType}</h3>
              <span className="text-xs text-slate-500">
                Остаток: {Math.max(0, Math.round(meal.remaining.calories))} ккал
              </span>
            </div>
            {meal.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Баланс КБЖУ</CardTitle>
          <p className="text-sm text-slate-600">Компенсация переносится на следующий день автоматически.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <NutrientTile label="Калории" value={remainingTotal.calories} suffix="ккал" />
          <NutrientTile label="Белки" value={remainingTotal.protein} />
          <NutrientTile label="Жиры" value={remainingTotal.fat} />
          <NutrientTile label="Углеводы" value={remainingTotal.carbs} />
        </CardContent>
      </Card>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Заказать все</Button>
        <Button variant="secondary">Пересобрать подборку</Button>
      </div>
    </div>
  )
}

const NutrientTile = ({ label, value, suffix = 'г' }: { label: string; value: number; suffix?: string }) => (
  <div className="rounded-xl bg-slate-50 p-4 text-center">
    <div className="text-sm text-slate-500">{label}</div>
    <div className="text-2xl font-semibold text-slate-900">{Math.round(value)} {suffix}</div>
  </div>
)
