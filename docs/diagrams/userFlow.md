## 1. Flujo de Autenticación

```mermaid
flowchart TD
    subgraph Frontend [Cliente / Interfaz]
        A([Inicio: Pantalla de Login]) --> B[Ingresar usuario y contraseña]
        B --> C[Enviar petición de Login]

        F_Err[Mostrar error de credenciales ⚠️] --> B
        G[Guardar token JWT y Redirigir al Dashboard 🔑] --> H([Usuario Autenticado / Dashboard 🎯])
    end

    subgraph Backend [Servidor y Base de Datos]
        C --> D{¿Credenciales válidas? 🔍}
        D -- No --> F_Err
        D -- Sí --> E[Generar Token JWT 🎟️]
        E --> G
    end
```

## 2. Flujo de Creación (Topic ➔ Grouping ➔ Item)

```mermaid
flowchart TD
    subgraph Frontend [Cliente / Interfaz]
        A([Inicio: Usuario en Dashboard]) --> B[Abrir formulario de Tema]
        B --> C[Enviar formulario de Tema]

        E_Err[Mostrar error de validación ⚠️] --> B

        G[Mostrar éxito y redirigir a vista de Tema 🔔] --> H[Clic en 'Crear Agrupación' 🔘]
        H --> I[Abrir formulario de Agrupación]
        I --> J[Enviar datos de Agrupación]

        L_Err[Mostrar error de validación ⚠️] --> I

        N[Mostrar éxito 🔔] --> O[Clic en 'Añadir dato' ➕]
        O --> P[Abrir formulario de Ítem]
        P --> Q[Ingresar datos: campos, tags y note]
        Q --> R[Enviar Ítem]

        T_Err[Mostrar error de Ítem ⚠️] --> P
        V([Fin: Ítem visible en pantalla 🎯])
    end

    subgraph Backend [Servidor y Base de Datos]
        C --> D{¿Tema válido? 🔍}
        D -- No --> E_Err
        D -- Sí --> F[(Guardar TOPIC en MongoDB 🗄️)]
        F --> G

        J --> K{¿Agrupación válida? 🔍}
        K -- No --> L_Err
        K -- Sí --> M[(Guardar GROUPING en MongoDB 🗄️)]
        M --> N

        R --> S{¿Ítem válido? 🔍}
        S -- No --> T_Err
        S -- Sí --> U[(Guardar ITEM en MongoDB 🗄️)]
        U --> V
    end
```

## 3. Flujo de Consulta y Filtrado (CRUD Read)

```mermaid
flowchart TD
    subgraph Frontend [Cliente / Interfaz]
        A([Inicio: Usuario entra a un Tema]) --> B[Solicitar Agrupaciones e Ítems]

        E_Err[Sesión expirada: Redirigir a Login ⚠️] --> A_Log([Pantalla de Login 🔑])
        F_Empty[Mostrar estado vacío: 'Sin datos registrados' 📭] --> G
        F_Data[Renderizar vista de Agrupaciones e Ítems 📊] --> G

        G[Usuario aplica filtro por Tag / Búsqueda 🔍] --> H{¿Tipo de filtrado?}

        H -- En Cliente React --> I[Filtrar estado local]
        H -- En Servidor --> J[Enviar petición HTTP con Query Params 🌐]

        I --> K[Actualizar vista con datos filtrados 🎯]
        M_Err[Mostrar 'No se encontraron coincidencias' 🔍] --> K
        M_Data[Actualizar vista con respuesta de BD 🎯] --> K
    end

    subgraph Backend [Servidor y Base de Datos]
        B --> C{¿Token JWT válido? 🔍}
        C -- No --> E_Err
        C -- Sí --> D[(Consultar Topic, Groupings e Items en MongoDB 🗄️)]

        D --> F{¿Se encontraron registros?}
        F -- No --> F_Empty
        F -- Sí --> F_Data

        J --> L[(Consulta con filtros/agregación en MongoDB 🗄️)]
        L --> M{¿Coincidencias encontradas?}
        M -- No --> M_Err
        M -- Sí --> M_Data
    end
```

## 4. Flujo de Edición y Eliminación (CRUD Update & Delete)

```mermaid
flowchart TD
    subgraph Frontend [Cliente / Interfaz]
        A([Inicio: Usuario visualiza un Ítem/Agrupación]) --> B{¿Qué acción realiza?}

        %% Rama de Edición
        B -- Editar ✏️ --> C[Abrir modal con datos pre-cargados]
        C --> D[Modificar campos y enviar formulario]
        D --> E[Enviar petición PUT / PATCH 🌐]

        %% Rama de Eliminación
        B -- Eliminar 🗑️ --> F[Mostrar modal de confirmación]
        F -- Cancela --> A
        F -- Confirma --> G[Enviar petición DELETE 🌐]

        %% Respuestas de la UI
        Err_Auth[Mostrar error: 'No autorizado / Sesión inválida' ⚠️] --> A
        Err_Val[Mostrar error de validación ⚠️] --> C

        Succ_Upd[Mostrar notificación: 'Actualizado con éxito' 🔔] --> H[Actualizar vista en tiempo real 🎯]
        Succ_Del[Mostrar notificación: 'Eliminado con éxito' 🔔] --> H
    end

    subgraph Backend [Servidor y Base de Datos]
        E --> I{¿Token válido y es dueño del recurso? 🔍}
        G --> I

        I -- No --> Err_Auth
        I -- Sí --> J{¿Tipo de Petición?}

        %% Operación según el verbo HTTP
        J -- PUT / PATCH --> K{¿Nuevos datos válidos? 🔍}
        K -- No --> Err_Val
        K -- Sí --> L[(Actualizar en MongoDB 🗄️)]
        L --> Succ_Upd

        J -- DELETE --> M[(Eliminar registro en MongoDB 🗄️)]
        M --> Succ_Del
    end
```

> [!NOTE]
> **Eliminación en Cascada:** El flujo de eliminación aplica por igual a **Temas**, **Agrupaciones** e **Ítems**. Al eliminar un Tema o una Agrupación, el backend ejecuta una eliminación en cascada en MongoDB para remover automáticamente todos los registros hijos asociados y evitar datos huérfanos.
