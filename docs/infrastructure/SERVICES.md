# Описание compose профилей и сервисов

Этот файл описывает для чего нужен тот или иной сервис.

Чтобы посмотреть типовые сценарии использования, прочитайте общее [руководство по разработке](../CONTRIBUTING.md) или [руководство по развёртыванию](../DEPLOYMENT.md).

## Профили

- `dev` — основной профиль для разработки, включает:
  - `backend-dev` (с автоматической перезагрузкой при изменениях)
  - `frontend-dev` (с HMR)
  - `postgres`
  - `nginx-dev` (80/443)

- `dev-https` — профиль для разработки с туннелированием в HTTPS контексте, включает:
  - `backend-dev` (с автоматической перезагрузкой при изменениях)
  - `frontend-dev` (с HMR)
  - `postgres`
  - `nginx-dev` (80/443)
  - `cloudpub-dev` (80)

- `dev-backend` — профиль только для разработки бэкенда, включает:
  - `backend-dev` (с автоматической перезагрузкой при изменениях)
  - `postgres`

- `test` — полный набор тестов, включает:
  - `backend-test-e2e`
  - `backend-test-unit`

- `test-e2e` — профиль для end-to-end тестирования, включает:
  - `backend-test-e2e`

- `test-unit` — профиль для юнит-тестов, включает:
  - `backend-test-unit`

- `staging` — локальное пред-продуктовое окружение, включает:
  - `backend-staging`
  - `frontend-staging`
  - `postgres`
  - `nginx-staging` (80/443)

- `staging-https` — локальное пред-продуктовое окружение с туннелированием в HTTPS контексте, включает:
  - `backend-staging`
  - `frontend-staging`
  - `postgres`
  - `nginx-staging` (80/443)
  - `cloudpub-staging` (80)

- `prod` — продуктовое окружение, включает:
  - `backend`
  - `frontend`
  - `postgres`
  - `nginx` (80/443)
  - `node-exporter`
  - `prometheus`
  - `alertmanager`
  - `grafana`

## Сервисы

- `backend` — продакшен версия бэкенда.
- `backend-dev` — версия бэкенда для разработки с автоматической перезагрузкой при изменениях, доступная на http://127.0.0.1:8000.
- `backend-test` — запуск всех тестов бэкенда.
- `backend-test-e2e` — запуск только e2e тестов бэкенда.
- `backend-test-unit` — запуск только unit тестов бэкенда.
- `backend-staging` — локальная пред-продакшен версия бэкенда.
- `frontend` — продакшен версия фронтенда.
- `frontend-dev` — версия фронтенда для разработки с HMR.
- `frontend-staging` — локальная пред-продакшен версия фронтенда.
- `postgres` — база данных (общая для `dev`, `test`, `staging` и `prod`)
- `node-exporter` — cбор метрик для prometheus'а.
- `prometheus` — мониторинг и алерты, доступный на http://127.0.0.1:9090.
- `alertmanager` — обработка алертов.
- `grafana` — визуализация метрик.
- `nginx` — продакшен прокси (80/443).
- `nginx-dev` — прокси для локальной разработки (80/443).
- `nginx-staging` — прокси для пред-продакшена с HTTPS (80/443).
- `cloudpub-dev` — туннель HTTPS для разработки и secure контекста (80).
- `cloudpub-staging` — туннель HTTPS для пред-продакшена и secure контекста (80).
