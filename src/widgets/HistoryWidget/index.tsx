import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import { getMockProducts } from '@/entities/Product/api'

export const HistoryWidget = () => {
  const products = getMockProducts().slice(0, 3)

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>История и предпочтения</CardTitle>
        <Button variant="ghost">Смотреть все</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">{product.name}</p>
              <p className="text-xs text-slate-500">{product.meal_type}</p>
            </div>
            <span className="text-sm text-slate-700">{product.price.toFixed(0)} ₽</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}