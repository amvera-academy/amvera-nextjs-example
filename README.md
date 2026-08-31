# Next.js на Amvera

Простой пример деплоя Next.js в [Amvera](https://amvera.ru).

Это тестовое приложение показывает работу App Router, Route Handlers, клиентского интерфейса и персистентное сохранение JSON в постоянное хранилище Amvera.

[КАК СОХРАНЯТЬ ФАЙЛЫ](#как-правильно-сохранять-файлы) | [СТАТИЧЕСКИЕ ФАЙЛЫ](#статические-файлы) | [NODEJS RUNTIME](#nodejs-runtime) | [BULLMQ](https://github.com/amvera-academy/amvera-nodejs-example/blob/main/BULLMQ.md) | [КАК ЗАПУСТИТЬ НА AMVERA](#деплой-в-amvera)

## Демо-приложение

Приложение имеет веб-интерфейс, на котором вы сразу можете выполнить доступные тестовые запросы.

- `GET /api/health`
- `GET /api/items`
- `POST /api/items`
- `DELETE /api/items/{id}`

Все запросы можно выполнить на главной странице.

<img width="777" height="688" alt="image" src="https://github.com/user-attachments/assets/2e3d1f5d-e2f5-4c11-9f3f-f14dd8453fbb" />

## Как правильно сохранять файлы

Все изменяемые данные сохраняются в `/data/items.json`. Это важно: если записывать файл не в `/data`, то при пересборке данные перезапишутся на состояние сборки. 

## Статические файлы

Файлы из `public` доступны от корня сайта. Например, `public/logo.svg` открывается по пути `/logo.svg`. CSS здесь подключен через `app/layout.js`.

## Node.js runtime

Работа с `node:fs` недоступна в Edge Runtime. Поэтому обработчики, которые сохраняют файлы в `/data`, явно используют:

```javascript
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
```

## Локальный запуск

```bash
npm install
npm run build
npm start
```

Откройте localhost:5000.

## Деплой в Amvera

Для деплоя конкретно этого приложения вам понадобится:

1. Создать аккаунт в [Amvera](https://cloud.amvera.ru);
2. Создать обычное приложение в любом регионе;
3. Загрузить в него код репозитория;
4. Во вкладке "Конфигурация" нажать кнопку "Собрать".

Когда приложение будет готово к работе и статус сменится на "Запущено", во вкладке "Домены" можно будет создать бесплатное доменное имя от Амвера.

Отдельный пример фоновой задачи и worker описан в общей [инструкции по BullMQ](https://github.com/amvera-academy/amvera-nodejs-example/blob/main/BULLMQ.md).
