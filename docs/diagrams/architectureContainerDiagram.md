# Arquitectura del Sistema (Modelo C4 - Nivel 2: Contenedores)

Este diagrama describe los contenedores principales de la aplicación, sus responsabilidades y los protocolos de comunicación utilizados.

```mermaid
graph TB
    subgraph Frontend["SPA (React + Vite)"]
        UI[Componentes UI]
        Zustand[Zustand Store\nEstado Global y Autenticación]
        ReactQuery[TanStack React Query\nEstado del Servidor y Caché]
    end

    subgraph Backend["API REST (Node.js + Express)"]
        Router[Router y Middlewares\nValidación JWT / Autorización]
        Logica[Controladores y Servicios\nLógica de Negocio]
    end

    subgraph Storage["Persistencia"]
        MongoDB[(MongoDB Atlas)]
    end

    UI --> |Consume estado UI/Auth| Zustand
    UI --> |Ejecuta queries y mutations| ReactQuery

    Zustand -- "Peticiones HTTP/JSON\n(Login / Logout)" --> Router
    ReactQuery -- "Peticiones HTTP/JSON\n(Bearer JWT Header)" --> Router

    Router -- "Peticiones Validadas" --> Logica
    Logica -- "Mongoose ODM" --> MongoDB
```

> [!NOTE]
> **Nota de Diseño:** Zustand gestiona exclusivamente el estado cliente/sesión local, mientras que TanStack React Query abstrae la sincronización, reintentos y almacenamiento en caché de los datos provenientes de la API REST.
