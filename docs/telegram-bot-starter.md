# Стартовый код Telegram-бота на Telegraf

Ниже — минимальный пример Telegram-бота на [Telegraf](https://telegraf.js.org/). Он использует переменную окружения `BOT_TOKEN` и реагирует на базовые команды.

## Установка

```bash
npm install telegraf dotenv
```

Создайте файл `.env` с вашим токеном:

```bash
BOT_TOKEN=ваш_токен_бота
```

## bot.ts

```ts
import 'dotenv/config';
import { Telegraf } from 'telegraf';

type BotContext = Telegraf['context'];

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('Укажите BOT_TOKEN в .env');
}

const bot = new Telegraf<BotContext>(token);

bot.start((ctx) => ctx.reply('Привет! Я готов к работе.'));
bot.help((ctx) => ctx.reply('Отправьте мне сообщение, и я его повторю.'));
bot.on('text', (ctx) => ctx.reply(`Эхо: ${ctx.message.text}`));

bot.catch((err) => {
  console.error('Произошла ошибка:', err);
});

bot.launch();

// Корректно завершаем бота при остановке процесса
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
```

## Запуск

```bash
npx ts-node bot.ts
```

Или соберите TypeScript в JavaScript и запускайте через `node dist/bot.js`.
