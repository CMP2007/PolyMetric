# Game Statistics

## Definición Arquitectónica y Especificación Técnica

### 1. Documento de Stack y Requerimientos No Funcionales (NFRs)

• **Frontend:** Single Page Application (SPA)

- Creada con **React + Vite**.
- Gestión de estado local y sesión UI con **Zustand**.
- Gestión de estado del servidor (fetching, caché e invalidación) con **TanStack React Query**.
- Bibliotecas CSS para maquetación rápida.

• **Backend:** Node.js con Express, siguiendo una Arquitectura en Capas limpia:

- **Rutas/Routes:** Define las URLs y métodos HTTP.
- **Controladores/Controllers:** Maneja las peticiones HTTP (`req`, `res`), valida entradas y captura errores.
- **Servicios/Services:** Contiene la lógica de negocio pura.
- **Modelos/Models:** Define los esquemas de Mongoose.
- **Base de Datos:** MongoDB (vía Mongoose ODM), elegida por la flexibilidad requerida para documentos dinámicos (agrupaciones y datos personalizados).

• **Autenticación y Seguridad:**

- Autenticación _stateless_ mediante JWT (JSON Web Tokens) pasados en el header `Authorization: Bearer <token>`.
- Encriptación de contraseñas con `bcrypt` / `bcryptjs`.
- Variables de entorno con `dotenv` (restringidas del control de versiones).
- Manejo de CORS restringido y sanitización básica contra inyecciones NoSQL.

### 2. Diseño del Modelo de Datos (Esquema ER / Mongoose)

#### Colección User

```
{
  username: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true }

```

#### Colección Topic (Tema)

```
{
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true }
```

#### Colección Grouping (Agrupación)

```
{
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  fieldsDefinition: [
    {
      fieldName: { type: String, required: true, trim: true }, // Ej: "Fuerza", "Rareza", "Descripción"
      fieldType: {
        type: String,
        enum: ['NAME_VALUE', 'NAME_ONLY'],
        default: 'NAME_VALUE'
      }
    }
  ]
}, { timestamps: true }
```

#### Colección Item (Registros Dinámicos de una Agrupación)

```
{
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  grouping: { type: Schema.Types.ObjectId, ref: 'Grouping', required: true },
  title: { type: String, required: true, trim: true },
  values: [
    {
      fieldName: { type: String, required: true },
      value: { type: Schema.Types.Mixed, default: null }
    }
  ],
  tags: [{ type: String, trim: true }],
  note: { type: String, default: "" }
}, { timestamps: true }
```

#### Colección Note (Anotaciones extensas / Notas)

```
{
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  subNotes: [
    {
      title: { type: String, trim: true, default: '' },
      content: { type: String, required: true, trim: true }
    }
  ]
}, { timestamps: true }
```

### 3. Especificación del Contrato de API REST

| Método        | Endpoint                    | Autenticado | Propósito / Historia de Usuario                           |
| :------------ | :-------------------------- | :---------: | :-------------------------------------------------------- |
| **POST**      | `/api/users`                |     ❌      | Registrar un nuevo usuario                                |
| **POST**      | `/api/login`                |     ❌      | Autenticar usuario y retornar el token JWT                |
| **GET**       | `/api/topics`               |     🔒      | Obtener todos los temas del usuario autenticado           |
| **POST**      | `/api/topics`               |     🔒      | Crear un nuevo tema                                       |
| **PUT/PATCH** | `/api/topics/:id`           |     🔒      | Modificar título o descripción de un tema                 |
| **DELETE**    | `/api/topics/:id`           |     🔒      | Eliminar un tema y todos sus elementos vinculados         |
| **GET**       | `/api/topics/:id/groupings` |     🔒      | Obtener las agrupaciones asociadas a un tema              |
| **POST**      | `/api/topics/:id/groupings` |     🔒      | Crear una agrupación definiendo sus campos personalizados |
| **PUT/PATCH** | `/api/groupings/:id`        |     🔒      | Modificar nombre o estructura de una agrupación           |
| **DELETE**    | `/api/groupings/:id`        |     🔒      | Eliminar una agrupación y sus ítems                       |
| **GET**       | `/api/groupings/:id/items`  |     🔒      | Obtener los ítems pertenecientes a una agrupación         |
| **POST**      | `/api/groupings/:id/items`  |     🔒      | Insertar un nuevo ítem con sus valores dinámicos          |
| **PUT/PATCH** | `/api/items/:id`            |     🔒      | Actualizar el título o valores de un ítem                 |
| **DELETE**    | `/api/items/:id`            |     🔒      | Eliminar un ítem individual                               |
| **GET**       | `/api/topics/:id/notes`     |     🔒      | Obtener todas las notas asociadas a un tema               |
| **POST**      | `/api/topics/:id/notes`     |     🔒      | Crear una nueva nota con sus sub-notas opcionales         |
| **PUT/PATCH** | `/api/notes/:id`            |     🔒      | Modificar el contenido o estructura de una nota           |
| **DELETE**    | `/api/notes/:id`            |     🔒      | Eliminar una nota                                         |

### 4. Estructura de Prototipo de la Aplicación (Estructura de Carpetas)

```
game-statistics/
├── backend/
│   ├── src/
│   │   ├── config/          # Conexión a DB (Mongoose), variables globales
│   │   ├── controllers/     # Lógica de peticiones y respuestas HTTP
│   │   ├── middleware/      # Verificación de JWT, manejador de errores
│   │   ├── models/          # Schemas de Mongoose (User, Topic, Grouping, Item, Note)
│   │   ├── routes/          # Definición de rutas Express
│   │   ├── services/        # Lógica de negocio pura
│   │   └── app.js           # Configuración principal de Express
│   ├── tests/               # Pruebas unitarias e integración del Backend (Vitest/Supertest)
│   ├── index.js             # Punto de entrada del servidor HTTP
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI reutilizable (modales, tablas, alertas, nav)
│   │   ├── hooks/           # Custom hooks con TanStack React Query (useTopics, useNotes)
│   │   ├── pages/           # Vistas principales (Dashboard, TopicDetail, GroupingDetail)
│   │   ├── services/        # Cliente Axios/Fetch para llamadas a la API REST
│   │   ├── store/           # Zustand store (useAuthStore para sesión/JWT)
│   │   └── App.jsx
│   └── vite.config.js
│
├── e2e-tests/               # Suite de pruebas automatizadas End-to-End (Playwright)
│   ├── tests/               # Archivos de prueba (auth.spec.js, topic.spec.js)
│   └── playwright.config.js
│
├── .prettierrc              # Reglas de formateo de código
├── .eslintrc.mjs            # Configuración de linter
├── package.json             # Pnpm/Npm workspace y scripts concurrentes
├── docs/
│   ├── diagrams/            # Diagramación del Proyecto
└── README.md
```

### 5. Diagramas del Sistema

Para consultar las especificaciones visuales detalladas, revisa los documentos dedicados:

- 📐 **Arquitectura de Contenedores (C4 Nivel 2):** [`docs/diagrams/architectureContainerDiagram.md`](./docs/diagrams/architectureContainerDiagram.md)
- 🗄️ **Modelo de Datos (ERD):** [`docs/diagrams/entityRelationshipDiagram.md`](./docs/diagrams/entityRelationshipDiagram.md)
- 🔄 **Flujos de Usuario y Secuencia CRUD:** [`docs/diagrams/userFlow.md`](./docs/diagrams/userFlow.md)
