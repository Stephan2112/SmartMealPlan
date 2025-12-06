import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { Telegraf, Markup } from 'telegraf'

const BOT_TOKEN = process.env.BOT_TOKEN
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://your-domain.example/miniapp'
const PORT = process.env.PORT || 3000

if (!BOT_TOKEN) {
  console.warn('⚠️  BOT_TOKEN не указан. Добавьте его в .env, чтобы запустить бота.')
}

const bot = BOT_TOKEN ? new Telegraf(BOT_TOKEN) : null
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, '..', 'dist')

if (bot) {
  bot.start((ctx) => {
    ctx.reply(
      'Готовы собрать меню? Открывайте мини‑приложение и выбирайте блюда — бот отправит список покупок прямо сюда.',
      Markup.keyboard([[Markup.button.webApp('Открыть мини‑приложение', WEB_APP_URL)]])
        .resize()
        .oneTime()
    )
  })

  bot.hears(/меню|рецепт|рецепты/i, (ctx) =>
    ctx.reply('Уже ищу! Откройте мини‑приложение, чтобы подобрать блюда под настроение и цель по калориям.', {
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.webApp('Перейти в Smart Meal Plan', WEB_APP_URL)],
      ]),
    })
  )

  bot.command('help', (ctx) =>
    ctx.reply(
      'Доступные команды:\n/start — открыть мини‑приложение\n/help — подсказать, что умеет бот\n/menu — получить подборку и план покупок',
      Markup.inlineKeyboard([[Markup.button.webApp('Открыть сейчас', WEB_APP_URL)]])
    )
  )

  bot.command('menu', (ctx) =>
    ctx.reply('Персональные подборки готовы в мини‑приложении. Нажмите кнопку ниже.', {
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.webApp('Запустить Smart Meal Plan', WEB_APP_URL)],
      ]),
    })
  )

  bot.launch()
  console.log('🚀 Telegraf bot запущен')
}

app.use(express.json())
app.use('/miniapp', express.static(distPath))

app.get('/health', (_, res) => res.json({ ok: true }))

app.get('/miniapp/*', (_, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🌐 Web server ready on http://localhost:${PORT}`)
  if (!bot) {
    console.log('Бот не запущен: BOT_TOKEN отсутствует.')
  }
})
