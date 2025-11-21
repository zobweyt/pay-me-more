workspace C3 "Container diagram" {

    model {
        user = person "Пользователь" "Хочет узнать свою стоимость на рынке труда."

        paymemore = softwareSystem "Pay me more" "Система для оценки ожидаемой зарплаты по резюме." {
            frontend = container "Сайт" "React" "Single-page приложение (UI)." {
                tags "WebBrowser"
            }
            main_back = container "Роутер" "Роутер / API Gateway бэкенда." {
                tags "Diamond"
            }
            auth = container "Хранение данных пользователя" "Аутентификация, сохранение резюме."
            wage = container "Предсказание зарплаты по резюме" "ML-сервис, предсказывает зарплату по резюме."
            suggestions = container "Советы по резюме" "LLM-сервис, даёт рекомендации по улучшению резюме."
            jobs = container "Вакансии" "Поиск подходящих вакансий."
            db = container "База данных" "Database" "Хранение пользовательских данных и метаданных." {
                tags "Database"
            }
            
            dataset = container "Датасет" "Внешний датасет, используемый для обучения/предсказаний." {
                tags "Folder"
            }
            openrouter = container "Openrouter" "Провайдер для запуска LLM/LLM-прокси." {
                tags "Component"
            }
        }

        # Отношения
        user -> frontend "Браузер (использует UI)"
        frontend -> main_back "HTTP/JSON → Отправляет запросы к API"

        main_back -> auth "Запрашивает/сохраняет данные пользователя"
        main_back -> wage "Запрашивает предсказание зарплаты"
        main_back -> suggestions "Запрашивает советы по резюме"
        main_back -> jobs "Запрашивает вакансии"

        wage -> dataset "Использует данные при обучении"
        jobs -> dataset "Ищет подходящие вакансии"

        auth -> db "Читает/пишет пользовательские данные"
        wage -> db "Читает/пишет (если нужно хранить модели/метрики)"
        suggestions -> openrouter "Запускает LLM через Openrouter"
    }

    views {
        # systemContext paymemore {
        #     include paymemore
        #     include user
        #     include frontend
        #     include dataset
        #     include openrouter
        #     include datasphere
        #     autolayout lr
        #     title "System Context — Pay me more"
        # }

        # container paymemore {
        #     include *
        #     include db
        #     include dataset
        #     include openrouter
        #     include datasphere
        #     autolayout lr  # попытка выстроить слева→справа, чтобы БД оказалась правее бэкенда
        #     title "Container View — Pay me more"
        # }

        styles {
            element "Person" {
                shape person
                background #6AA84F
                color #ffffff
            }
            element "Software System" {
                background #1168bd
                color #ffffff
            }
            element "Container" {
                shape roundedbox
                background #ffffff
                stroke #2B75BB
            }
            element "Container, External" {
                background #E6E6E6
                stroke #CCCCCC
            }
            element "Database" {
                shape cylinder
                background #ffffff
                stroke #2B75BB
            }
            element "External" {
                opacity 30
            }
            element "WebBrowser" {
                shape WebBrowser
            }
            element "Diamond" {
                shape Diamond
            }
            element "Component" {
                shape Component
            }
            element "Folder" {
                shape Folder
            }
        }
    }
}
