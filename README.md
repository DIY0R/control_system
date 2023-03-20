# Control System

### Количество слоев может _варьироваться_ в зависимости от проекта !!!

Уровень представления (presentation):
- Controllers (контроллеры) - обрабатывают входящие запросы от пользователей
- Views (представления) - отображают данные для пользователей
- Routes (маршруты) - определяют маршруты для доступа к контроллерам


Уровень бизнес-логики (domain):
- Entities (сущности) - объекты бизнес-логики, представляющие собой абстракции реальных объектов или процессов
- Use Cases (прецеденты использования) - определяют бизнес-логику приложения и реализуют взаимодействие между сущностями
- Repositories (репозитории) - определяют интерфейсы для доступа к данным и реализуют их

Уровень инфраструктуры (infrastructure):
- Data Access (доступ к данным) - реализует интерфейсы репозиториев для работы с базой данных или другими хранилищами данных
- External Interfaces (внешние интерфейсы) - реализует интерфейсы для взаимодействия с внешними системами, такими как API других приложений или фреймворков