```mermaid
erDiagram
  user {
    UUID id PK
    string username
    string password
    bool is_superuser
    datetime created_at
    datetime updated_at
  }
```
