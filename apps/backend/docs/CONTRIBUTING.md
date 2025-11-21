# Руководство по разработке бэкенда

**Это руководство именно по разработке бэкенда, которое не затрагивает общие принципы, фронтенд или развёртывание.**

Подразумевается, что вы уже прочитали общее [руководство по разработке](../../../docs/CONTRIBUTING.md).

## Предварительные требования

- [Python](https://python.org) 3.13 или выше.

## Настройка окружения

1. Перейдите в директорию приложения:

   ```sh
   cd apps/backend
   ```

2. Создайте и активируйте виртуальное окружение:

   ```sh
   python -m venv .venv
   source .venv/bin/activate
   ```

3. Установите необходимые зависимости для разработки:

   ```sh
   pip install -r requirements/dev.txt
   ```

   Если вы тестировщик, то вам потребуется дополнительно установить зависимости для тестирования:

   ```sh
   pip install -r requirements/test.txt
   ```

4. Установите git-хуки для соблюдения код-стайла:

   ```sh
   pre-commit install
   ```

   Вы также можете проверить код-стайл без коммита, используя следующую команду:

   ```sh
   pre-commit
   ```

> [!NOTE] Примечание
> В случае необходимости вы можете не выполнять git-хуки перед коммитом при помощи аргумента [--no-verify](https://git-scm.com/docs/githooks#_pre_commit).

## Запуск проекта

Для запуска приложения в режиме разработки используйте:

```sh
docker compose --profile dev-backend up
```

После запуска будут доступны следующие ссылки:

- Интерактивная документация API: http://127.0.0.1:8000/docs.
- Админ панель: http://127.0.0.1:8000/admin.

## Создание супер-пользователя

Для создания супер-пользователя используется специальный скрипт:

```sh
docker exec -it pay-me-more-backend-dev python -m cli superuser create
```

## Создание миграций и взаимодействие с alembic

0. Убедитесь, что вы находитесь в директории `apps/backend` и ваше виртуальное окружение активно.

   ```sh
   cd apps/backend
   source .venv/bin/activate
   ```

1. Запустите контейнер с базой данных в фоновом режиме:

   ```sh
   docker compose up postgres -d --remove-orphans
   ```

2. Обновите базу данных до последей версии:

   ```sh
   BACKEND_POSTGRES_HOST="localhost" alembic upgrade head
   ```

3. Сделайте миграцию или выполните иные необходимые команды:

   ```sh
   BACKEND_POSTGRES_HOST="localhost" alembic revision --autogenerate -m "message"
   ```

> [!NOTE] Примечание
> Переопределение переменной `BACKEND_POSTGRES_HOST` важно, чтобы иметь возможность использовать команды `alembic` вне Docker.

> [!TIP] Рекомендация
> Если вы часто работаете с `alembic`, то вы можете временно поменять переменную `BACKEND_POSTGRES_HOST` в [`.env`](../../../.env) с `"postgres"` на `"localhost"`, чтобы каждый раз не добавлять `BACKEND_POSTGRES_HOST="localhost"` перед командами.

4. Остановите и очистите контейнер с базой данных после всех действий:

   ```sh
   docker compose down postgres -v --remove-orphans
   ```

## Очистка окружения

Для остановки и удаления контейнеров, включая volumes, выполните:

```sh
docker compose --profile dev-backend down -v
```

Удаление установленных зависимостей:

```sh
rm -rf .venv
```
