import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'
import { DailySelectionWidget } from '@/widgets/DailySelectionWidget'

export const DashboardPage = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900">Дашборд</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Текущая подборка</CardTitle>
          </CardHeader>
          <CardContent>
            <DailySelectionWidget />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Аналитика</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>Компенсация за вчера: +120 ккал</p>
            <p>Любимые источники: Яндекс Лавка, Самокат</p>
            <p>Средний чек: 320 ₽</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}