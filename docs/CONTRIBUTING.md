# Руководство по разработке

**Это руководство по общей разработке, которое не затрагивает бэкенд, фронтенд или развёртывание.**

Если вас интересуют другие компоненты проекта, то изучите следующую документацию:

- [Руководство по разработке бэкенда](../apps/backend/docs/CONTRIBUTING.md).
- [Руководство по разработке фронтенда](../apps/frontend/docs/CONTRIBUTING.md).
- [Руководство по развёртыванию](./DEPLOYMENT.md).

## Предварительные требования

- [Docker](https://www.docker.com/).

## Настройка редактора кода

Выберите один из предложенных редакторов кода.

### Visual Studio Code (рекомендуется)

> [!WARNING] Важно
> **Не открывайте проект в качестве папки. Используйте именно [workspace-файл](../pay-me-more.code-workspace) для корректной работы линтеров и расширений в этом монорепозитории.**

Данный редактор полностью настроен для начала фулстек разработки в этом проекте за 3 шага.

#### Открытие проекта

1. Откройте файл [`pay-me-more.code-workspace`](../pay-me-more.code-workspace).
2. Нажмите `Open Workspace` во всплывающем окне.
3. Установите все предложенные расширения.

#### Структура в обозревателе

- `root` — корень всего проекта.
- `backend` — корень бэкенда ([`apps/backend`](../apps/backend)).
- `frontend` — корень фронтенда ([`apps/frontend`](../apps/frontend)).

> [!NOTE] Примечание
> `root` добавлен так как в _code-workspace_ можно добавлять только папки, а [файлы на данный момент добавить невозможно](https://github.com/microsoft/vscode/issues/45177).

### PyCharm

> [!WARNING] Важно
> **Не открывайте корневую папку проекта — это может нарушить работу возможностей IDE.**

Данный IDE рекомендуется использовать только для разработки бэкенда.

#### Открытие проекта

Откройте папку [`apps/backend`](../apps/backend) как проект для корректной работы всех возможностей IDE.

## Настройка окружения

1. Склонируйте этот репозиторий:

   ```sh
   git clone git@gitlab.prodcontest.com:team-36/pay-me-more.git
   cd pay-me-more
   ```

2. Скопируйте пример конфигурации окружения:

   ```sh
   cp .env.example .env
   ```

3. Заполните и настройте ваш `.env`.

   Вот несколько полезных ссылок, которые вам могут пригодиться в этом процессе:

   - **Telegram [@BotFather](https://t.me/BotFather)**: используется для получения `ALERTMANAGER_TELEGRAM_BOT_TOKEN`.
   - **Telegram [@getmyid_bot](https://t.me/getmyid_bot)**: используется для получения `ALERTMANAGER_TELEGRAM_CHAT_ID`.

## Управление сервисами и общие команды

### Разработка

#### Запуск в режиме разработки со сборкой

```sh
docker compose --profile dev up --build
```

#### Очистка с удалением volumes

```sh
docker compose --profile dev down -v
```

### Разработка с HTTPS

Предварительно нужно заполнить `CLOUDPUB_TOKEN` в `.env`. Можно получить тут: https://cloudpub.ru/dashboard/

#### Запуск в режиме разработки с HTTPS со сборкой

```sh
docker compose --profile dev-https up --build
```

#### Очистка с удалением volumes

```sh
docker compose --profile dev-https down -v
```

### Тестирование (e2e + unit)

#### Запуск всех тестов с автоматическим выходом после завершения

```sh
docker compose --profile test up --build --abort-on-container-exit
```

#### Очистка после всех тестов с удалением volumes

```sh
docker compose --profile test down -v
```

### End-to-End тесты (e2e)

#### Запуск e2e тестов с автоматическим выходом после завершения

```sh
docker compose --profile test-e2e up --build --abort-on-container-exit
```

#### Очистка после e2e тестов с удалением volumes

```sh
docker compose --profile test-e2e down -v
```

### Юнит-тесты (unit)

#### Запуск unit тестов с автоматическим выходом после завершения

```sh
docker compose --profile test-unit up --build --abort-on-container-exit
```

#### Очистка после unit тестов с удалением volumes

```sh
docker compose --profile test-unit down -v
```

### Локальный пред-продакшен

#### Запуск в пред-продакшене

```sh
docker compose --profile staging up --build
```

#### Очистка с удалением volumes

```sh
docker compose --profile staging down -v
```

### Локальный пред-продакшен с HTTPS

Предварительно нужно заполнить `CLOUDPUB_TOKEN` в `.env`. Можно получить тут: https://cloudpub.ru/dashboard/

#### Запуск в пред-продакшене

```sh
docker compose --profile staging-https up --build
```

#### Очистка с удалением volumes

```sh
docker compose --profile staging-https down -v
```
