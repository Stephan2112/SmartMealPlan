import { useEffect, useMemo, useState } from 'react'
import './App.css'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void
        expand: () => void
        colorScheme?: string
        themeParams?: Record<string, string>
        initDataUnsafe?: {
          user?: {
            first_name?: string
            last_name?: string
            username?: string
          }
        }
      }
    }
  }
}

const featureCards = [
  {
    title: 'Умное меню',
    description: 'Подбираем рецепты под ваши калорийность, аллергенные ограничения и настроение.',
    accent: 'Баланс вкуса и здоровья',
  },
  {
    title: 'Магазин в один тап',
    description: 'Собираем корзину по выбранным блюдам и синхронизируем с Telegram Mini App.',
    accent: 'Экономия времени',
  },
  {
    title: 'Ритуалы заботы',
    description: 'Напоминания, водный баланс и уютные подборки на вечер прямо в Telegram.',
    accent: 'Дружелюбный помощник',
  },
]

const steps = [
  'Запустите бота и нажмите «Открыть мини‑приложение».',
  'Соберите своё меню из авторских карточек с подсказками.',
  'Получите список покупок и план на неделю в одном месте.',
]

function App() {
  const [isTelegram, setIsTelegram] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const webAppUser = useMemo(() => {
    const fullName = [
      window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name,
      window.Telegram?.WebApp?.initDataUnsafe?.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ')

    return fullName || window.Telegram?.WebApp?.initDataUnsafe?.user?.username || ''
  }, [])

  useEffect(() => {
    const webApp = window.Telegram?.WebApp

    if (webApp) {
      webApp.ready()
      webApp.expand()
      setIsTelegram(true)
      setTheme(webApp.colorScheme === 'dark' ? 'dark' : 'light')
    }
  }, [])

  return (
    <div className={`page ${theme === 'dark' ? 'page-dark' : ''}`}>
      <div className="glow" />
      <div className="glow second" />

      <header className="hero">
        <div className="eyebrow">Telegram Mini Apps • Telegraf bot</div>
        <h1>
          Smart Meal Plan <span className="highlight">Mini</span>
          <br /> Ваш личный гастро‑ассистент
        </h1>
        <p className="subtitle">
          Создано для быстрого запуска внутри Telegram: бот на Node.js + Telegraf отправляет кнопку мини‑приложения,
          а веб‑клиент встречает вас уютной страницей с рекомендациями и списком покупок.
        </p>

        <div className="cta-group">
          <a
            className="primary"
            href="https://t.me/your_bot_username?start=miniapp"
            target="_blank"
            rel="noreferrer"
          >
            Открыть мини‑приложение
          </a>
          <a className="ghost" href="#features">
            Узнать, как это работает
          </a>
        </div>

        <div className="hero-card">
          <div>
            <p className="badge">Мини‑приложение внутри Telegram</p>
            <h2>Комфортный onboarding</h2>
            <p>
              {isTelegram
                ? `Привет${webAppUser ? `, ${webAppUser}` : ''}! Мы уже адаптировали тему под Telegram.`
                : 'Откройте страницу из Telegram, чтобы увидеть персонализацию и мгновенный переход к боту.'}
            </p>
          </div>
          <div className="stats">
            <div>
              <strong>24/7</strong>
              <span>Доступен в чате</span>
            </div>
            <div>
              <strong>+120</strong>
              <span>Рецептов в подборках</span>
            </div>
            <div>
              <strong>≈10 мин</strong>
              <span>До готового меню</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="feature-grid" id="features">
          {featureCards.map((card) => (
            <article className="feature" key={card.title}>
              <p className="accent">{card.accent}</p>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </section>

        <section className="timeline">
          <div className="timeline-header">
            <p className="badge">3 шага</p>
            <h2>Настройте план под себя</h2>
            <p>Мини‑приложение стартует мгновенно, а бот остаётся на связи и отправляет подборки и уведомления.</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <div key={step} className="step">
                <div className="step-number">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-banner">
          <div>
            <p className="badge">Готовы попробовать?</p>
            <h2>Оставьте боту заботу о списке покупок</h2>
            <p>
              В репозитории уже есть сервер на Telegraf и мини‑приложение на Vite. Замените токен и URL — и ваш бот
              готов к релизу.
            </p>
          </div>
          <div className="cta-actions">
            <a
              className="primary secondary"
              href="https://t.me/your_bot_username?start=miniapp"
              target="_blank"
              rel="noreferrer"
            >
              Запустить бота
            </a>
            <span className="hint">Поддерживает светлую и тёмную темы Telegram</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
