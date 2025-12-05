
# SmartMealPlan

SmartMealPlan — React/Vite приложение для автоматизированного подбора и заказа продуктов под цели КБЖУ. Проект использует Supabase для аутентификации и хранения данных, React Query и Zustand для работы с состоянием и Tailwind CSS для стилизации.

## Основные возможности
- Регистрация/вход через Supabase.
- Главная страница с ежедневной подборкой продуктов и автоматической компенсацией КБЖУ.
- История и предпочтения с учетом лайков и заказов.
- Защищенные маршруты для профиля, истории и дашборда.

## Запуск
1. Создайте файл `.env` на основе `.env.example` и заполните ключи Supabase.
2. Установите зависимости (`npm install` или `pnpm install`).
3. Запустите проект: `npm run dev`.

## Стек
React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui основы, Zustand, React Query, React Hook Form + Zod, Supabase JS Client.