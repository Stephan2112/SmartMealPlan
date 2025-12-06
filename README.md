# SmartMealPlan Telegram Mini App

SmartMealPlan — витринное мини‑приложение для Telegram, собранное на React/Vite, и бот на Node.js + Telegraf, который отправляет
кнопку для открытия веб‑клиента внутри чата. Интерфейс адаптируется под светлую и тёмную темы Telegram и предлагает быстрый
онбординг с рецептами и списком покупок.

## Возможности
- React/Vite клиент с насыщенным UI, подготовленным для Telegram Mini Apps.
- Бот на Telegraf с командами `/start`, `/help` и `/menu`, который отдаёт кнопку WebApp.
- Express‑сервер для отдачи собранного фронтенда по пути `/miniapp` и health‑маршрутом `/health`.
- Лёгкая персонализация: замените токен, URL мини‑приложения и тексты — и бот готов к публикации.

## Как запустить
1. Создайте файл `.env` на основе `.env.example` и заполните переменные `BOT_TOKEN` и `WEB_APP_URL`.
2. Установите зависимости `npm install` (или `pnpm install`, `yarn install`).
3. Соберите фронтенд: `npm run build`.
4. Запустите сервер и бота: `npm run bot` — Express отдаст `dist` по `/miniapp`, бот предложит кнопку WebApp.

> В продакшне вы можете настроить вебхуки Telegraf или использовать `bot.launch()` как в примере для long polling.

## Стек
React 18, TypeScript, Vite, Tailwind CSS, Zustand, React Query, React Hook Form + Zod, Telegraf, Express.
