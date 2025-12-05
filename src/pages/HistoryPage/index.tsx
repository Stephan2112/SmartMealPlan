import { HistoryWidget } from '@/widgets/HistoryWidget'

export const HistoryPage = () => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">История</h1>
      <p className="text-sm text-slate-600">Избранное и последние заказы.</p>
      <div className="mt-4">
        <HistoryWidget />
      </div>
    </div>
  )
}