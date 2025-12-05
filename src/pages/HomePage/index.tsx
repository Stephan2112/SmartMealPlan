import { DailySelectionWidget } from '@/widgets/DailySelectionWidget'
import { HistoryWidget } from '@/widgets/HistoryWidget'
import { Button } from '@/shared/ui/Button'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-brand">SmartMealPlan</p>
          <h1 className="text-3xl font-bold text-slate-900">Подборка еды под ваши цели</h1>
          <p className="text-slate-600">Автоматическая компенсация КБЖУ и интеграция с доставками.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="secondary">Войти</Button>
          </Link>
          <Link to="/signup">
            <Button>Регистрация</Button>
          </Link>
        </div>
      </header>

      <DailySelectionWidget />

      <section>
        <HistoryWidget />
      </section>
    </div>
  )
}