import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import { formatNutrient } from '@/shared/lib/utils'
import { Product } from '@/entities/Product/types'

interface ProductCardProps {
  product: Product
  onReplace?: () => void
}

export const ProductCard = ({ product, onReplace }: ProductCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-3">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-20 w-20 rounded-xl object-cover"
            onError={(event) => {
              const target = event.target as HTMLImageElement
              target.src = 'https://placehold.co/160x160?text=Food'
            }}
          />
          <div className="flex-1">
            <CardTitle>{product.name}</CardTitle>
            <p className="mt-1 text-sm text-slate-600">{product.description}</p>
            <div className="mt-2 text-xs text-slate-500 capitalize">{product.meal_type}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium text-slate-600">
          <div>
            <div className="text-slate-900">{Math.round(product.nutrients.calories)} kcal</div>
            <div className="text-slate-500">Калории</div>
          </div>
          <div>
            <div className="text-slate-900">{formatNutrient(product.nutrients.protein)}</div>
            <div className="text-slate-500">Белки</div>
          </div>
          <div>
            <div className="text-slate-900">{formatNutrient(product.nutrients.fat)}</div>
            <div className="text-slate-500">Жиры</div>
          </div>
          <div>
            <div className="text-slate-900">{formatNutrient(product.nutrients.carbs)}</div>
            <div className="text-slate-500">Углеводы</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">{product.price.toFixed(2)} ₽</span>
          <div className="flex gap-2">
            <Button onClick={() => window.open(product.external_url ?? '#', '_blank')} variant="primary">
              Заказать
            </Button>
            {onReplace && (
              <Button variant="secondary" onClick={onReplace}>
                Заменить
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
