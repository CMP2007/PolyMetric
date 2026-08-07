# Diagrama de Secuencia: Creación de Ítem con Autenticación JWT

Este diagrama ilustra el ciclo de vida completo de una petición de escritura (POST) desde la acción del usuario en la SPA hasta la persistencia en la base de datos, destacando la interceptación del middleware de autenticación en Express.

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario
    participant UI as Componentes React
    participant RQ as React Query / Axios
    participant ZS as Zustand Store (Auth)
    participant MW as Auth Middleware (Express)
    participant CTRL as Item Controller / Service
    participant DB as MongoDB (Mongoose)

    U->>UI: Completa formulario y da clic en "Guardar Ítem"
    UI->>ZS: Obtener JWT Token actual
    ZS-->>UI: Retorna Token JWT
    UI->>RQ: Dispara Mutation (POST /api/groupings/:id/items)
    RQ->>MW: Petición HTTP POST (Header Authorization: Bearer <JWT>)

    alt Token Inválido, Expirado o Ausente
        MW-->>RQ: Respuesta HTTP 401 Unauthorized
        RQ-->>UI: Estado onError (Captura de error)
        UI-->>ZS: Limpiar sesión (Logout)
        UI-->>U: Muestra alerta de sesión expirada / Redirige a Login
    else Token Válido y Propiedad Confirmada
        MW->>CTRL: req.user adjuntado -> Pasa al Controlador
        CTRL->>DB: Item.create({ ...data, user: req.user.id })
        DB-->>CTRL: Documento guardado (_id, createdAt)
        CTRL-->>RQ: Respuesta HTTP 201 Created (JSON Ítem)
        RQ->>RQ: Invalida caché de la consulta ('items')
        RQ-->>UI: Dispara re-render con datos actualizados
        UI-->>U: Cierra modal y muestra notificación de éxito 🔔
    end

```
