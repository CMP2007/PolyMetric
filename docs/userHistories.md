# Game Statistics — Historias de Usuario y Requisitos

## Fase 1: Ideación y Definición del Problema

### Definición del Problema

- **¿Cuál es el dolor o la necesidad actual?:** Comparar el rendimiento de armas/personajes en juegos mediante métricas personalizadas.
- **¿A quién le afecta?:** Se trata de una herramienta creada por diversión para uso propio; para otros podría ser una herramienta para la representación de datos con valores numéricos.
- **¿Cómo lo resuelve tu software?:** Permite crear diversos temas, los cuales pueden poseer diversas agrupaciones de datos, cada una con su propio criterio o forma de enlistar, procesar o representar los datos.

### Pautas Esenciales del Proyecto

- Los formularios de las agrupaciones deben establecer cómo serán los formularios personalizables de los datos que contendrán.
- Las agrupaciones no pueden modificar la estructura de los datos una vez establecidas, pero sí cómo se grafican.
- Debe existir un manejo de errores según las posibles respuestas del backend.
- Debe existir un sistema de notificaciones para casos exitosos o fallos en las acciones del usuario.
- La estructura base de un dato será `nombre/valor(numérico)` o únicamente `nombre`.
- Los elementos creados por el usuario poseedores de esos datos podrán tener dos tipos de propiedades:
  - **Propiedades:** Valores propios del elemento.
  - **Resultados:** Datos resultantes de cualquier procesamiento que el usuario defina (`+`, `-`, `/`, `*`, `>`, `<`).

---

## Historias de Usuario (User Stories)

Format: _Como [tipo de usuario], quiero [acción/funcionalidad] para [beneficio/propósito]._

- **HU-01:** Como visitante, quiero una página de inicio que contenga enlaces a los formularios de inicio de sesión y de creación de usuario para poder acceder a esos formularios.
- **HU-02:** Como visitante, quiero un formulario para crear un usuario en caso de que no tenga uno o desee crear una instancia nueva.
- **HU-03:** Como usuario registrado, quiero iniciar sesión para ingresar a mi cuenta con mis temas y estadísticas creados.
- **HU-04:** Como usuario registrado, quiero tener un botón de cerrar sesión para resguardar mi cuenta.
- **HU-05:** Como usuario registrado, quiero una pestaña de inicio adonde pueda llegar al iniciar sesión, para poder ver el listado de mis temas creados hasta la fecha y ubicarme fácilmente.
- **HU-06:** Como usuario registrado, quiero tener la opción de crear nuevos temas desde la pestaña de inicio para tener un acceso rápido al formulario.
- **HU-07:** Como usuario registrado, quiero un formulario para crear nuevos temas según mis necesidades.
- **HU-08:** Como usuario registrado, quiero que al crear un nuevo tema sea llevado a una pestaña de inicio interna del tema donde pueda ver las agrupaciones creadas hasta la fecha o crear nuevas.
- **HU-09:** Como usuario registrado, quiero un formulario para crear nuevas agrupaciones dentro de mis temas según mis necesidades.
- **HU-10:** Como usuario registrado, quiero que al crear una nueva agrupación sea llevado a una pestaña de inicio interna de esta donde pueda ver la representación actual de los datos registrados hasta la fecha y añadir nuevos datos.
- **HU-11:** Como usuario registrado, quiero un formulario para registrar nuevos datos dentro de mi agrupación.
- **HU-12:** Como usuario registrado, quiero que dentro de un tema, aparte de poder hacer una agrupación, también tenga la opción de crear un registro independiente de estructura como nota u observación.
- **HU-13:** Como usuario registrado, quiero la opción de poder modificar el valor de los datos de una agrupación, así como también el nombre de la agrupación y del tema.
- **HU-14:** Como usuario registrado, quiero la opción de poder eliminar un dato, una agrupación y un tema.
- **HU-15:** Como usuario registrado, quiero que los datos de una agrupación tengan un sistema de etiquetas personalizables por el usuario para agrupar los datos.
- **HU-16:** Como usuario registrado, quiero que también sea posible graficar o hacer una tabla con los datos según su etiqueta personalizada.
- **HU-17:** Como usuario registrado, quiero que sea posible graficar o hacer tablas con los datos según el criterio del usuario.
- **HU-18:** Como usuario registrado, quiero tener la opción de poner una descripción a los temas que cree.
- **HU-19:** Como usuario registrado, quiero que exista un sistema de colores para diferenciar o representar un tema o una agrupación de sus hermanos, así como también los datos (hacer posible elegir un color).
- **HU-20:** Como usuario registrado, quiero tener la opción de poner una descripción a las agrupaciones que cree.
- **HU-21:** Como usuario registrado, quiero tener la opción de poner una breve nota a los datos que registre.
- **HU-22:** Como usuario registrado, quiero que exista un buscador para buscar un dato en particular en base a su nombre de forma rápida y simple.
- **HU-23:** Como usuario registrado, quiero que existan filtros para buscar entre los datos según campos personalizados como su etiqueta o un valor en particular.
- **HU-24:** Como usuario registrado, quiero tener una selección de gráficas disponibles para elegir el cómo se representan los datos crudos o el resultado de procesar los datos de la agrupación actual.
- **HU-25:** Como usuario registrado, quiero que la agrupación me permita definir la estructura nombre-valor/solo nombre de los datos así como el número de campos que va a poseer un dato.
- **HU-26:** Como usuario registrado, quiero que la agrupación me permita definir si un campo de dato es una propiedad de este o un valor general que representa el dato como unidad.
- **HU-27:** Como usuario registrado, quiero que exista una vista de detalles para aquellos datos que contengan múltiples valores dentro de sí.
- **HU-28:** Como usuario registrado, quiero que la agrupación me permita definir de qué forma se van a comparar los valores de los datos entre sí (`-`, `*`, `/`, `+`, `>`, `<`).
- **HU-29:** Como usuario registrado, quiero la opción de poder cambiar el cómo se grafican, procesan o comparan los datos en mi agrupación en cualquier momento.
- **HU-30:** Como usuario registrado, quiero tener un menú de gestión de usuario para modificar contraseña y nombre de usuario.
- **HU-31:** Como usuario registrado, quiero que una agrupación pueda tener la opción de definir más de una estructura de datos previamente establecida.
- **HU-32:** Como usuario registrado, quiero que un elemento que contenga diversos valores en su sección de detalles tenga la opción de guardar múltiples valores opcionales para alternar el valor principal utilizado de cara a otros elementos de la agrupación.
- **HU-33:** Como usuario registrado, quiero que sea posible obtener los datos registrados dentro de una agrupación y registrarlos dentro de una nueva agrupación siempre y cuando ambas se encuentren dentro de un mismo tema.
- **HU-34:** Como usuario registrado, quiero que exista la opción de filtrar qué datos se obtienen desde una agrupación hermana según su etiqueta.
- **HU-35:** Como usuario registrado, quiero que la herramienta sea capaz de omitir los datos duplicados en los procesos de obtención de datos de una agrupación hermana.
- **HU-36:** Como usuario registrado, quiero que también exista la opción de aprobar manualmente qué datos se obtienen desde otra agrupación teniendo disponibles los botones de aprobar y rechazar.
- **HU-37:** Como usuario registrado, quiero la opción de activar o desactivar la opción de omitir los datos duplicados en los procesos de obtención de datos de una agrupación a otra.
- **HU-38:** Como usuario registrado, quiero tener la opción de ingresar imágenes para representar temas, agrupaciones o datos.
- **HU-39:** Como usuario registrado, quiero hacer que múltiples usuarios puedan acceder a una instancia compartida, para trabajar los temas, agrupaciones y datos en equipo.
- **HU-40:** Como usuario registrado, quiero disponer de un botón para alternar entre el modo oscuro y el modo claro en la interfaz para adaptar la experiencia visual a mis preferencias.

---

## Alcance y MVP (Priorización MoSCoW)

### Must Have (MVP)

1. HU-01: Página de inicio con enlaces a login y registro.
2. HU-02: Formulario para crear usuario.
3. HU-03: Iniciar sesión para ingresar a la cuenta.
4. HU-04: Botón de cerrar sesión.
5. HU-05: Pestaña de inicio con el listado de temas.
6. HU-06: Opción de crear nuevos temas desde el inicio.
7. HU-07: Formulario para crear nuevos temas.
8. HU-08: Redirección al tema creado para ver o crear agrupaciones.
9. HU-09: Formulario para crear agrupaciones dentro de temas.
10. HU-10: Redirección a la agrupación para ver representación de datos y añadir nuevos.
11. HU-11: Formulario para registrar nuevos datos en la agrupación.
12. HU-12: Opción de registro independiente (nota u observación) en un tema.
13. HU-13: Modificar valor de datos, nombre de agrupación y nombre del tema.
14. HU-14: Eliminar un dato, una agrupación y un tema.

### Should Have

1. HU-15: Sistema de etiquetas personalizables.
2. HU-16: Graficar o listar tablas según etiquetas.
3. HU-17: Graficar o hacer tablas según el criterio del usuario.
4. HU-18: Descripción en temas.
5. HU-19: Sistema de colores para diferenciar temas, agrupaciones y datos.
6. HU-20: Descripción en agrupaciones.
7. HU-21: Notas breves en datos.
8. HU-22: Buscador de datos por nombre.
9. HU-23: Filtros por campos personalizados o etiquetas.
10. HU-24: Selección de gráficas disponibles (datos crudos o procesados).
11. HU-25: Definir estructura nombre-valor o solo nombre y número de campos.
12. HU-26: Definir si un campo es propiedad o valor general.
13. HU-27: Vista de detalles para datos con múltiples valores.
14. HU-28: Definir operadores de comparación entre datos (`-`, `*`, `/`, `+`, `>`, `<`).
15. HU-29: Cambiar modo de graficar, procesar o comparar en cualquier momento.
16. HU-30: Menú de gestión de usuario (contraseña y nombre).
17. HU-31: Definir más de una estructura de datos previa en agrupaciones.
18. HU-32: Múltiples valores opcionales en sección de detalles para alternar el principal.
19. HU-40: Botón de cambio de tema (Modo Oscuro / Modo Claro).

### Could Have

1. HU-33: Obtener y registrar datos entre agrupaciones del mismo tema.
2. HU-34: Filtrar datos importados desde agrupación hermana por etiqueta.
3. HU-35: Omitir datos duplicados en importación de agrupación hermana.
4. HU-36: Aprobación manual (aprobar/rechazar) de datos importados.
5. HU-37: Toggle para activar/desactivar la omisión de duplicados.
6. HU-38: Cargar imágenes para representar temas, agrupaciones o datos.

### Won't Have (Por Ahora)

1. HU-39: Acceso multiusuario a instancias compartidas (trabajo en equipo).
2. Integración automática con APIs externas de juegos (Steam, Riot, WoW, etc.).
3. Exportación de datos a PDF, CSV o Excel.

---

## Criterios de Aceptación (Fase 1 - MVP)

### HU-01: Enlaces en Inicio

- Debe renderizar los enlaces a los formularios de login o creación de cuenta.

### HU-02: Registro de Usuario

- El formulario valida que todos los campos obligatorios estén completos.
- Debe enviar la petición `POST` a la API correspondiente.

### HU-03: Inicio de Sesión

- Debe enviar la petición a la API de autenticación.
- El backend debe autenticar las credenciales y retornar un JWT válido que el cliente almacenará para peticiones subsecuentes.

### HU-04: Cerrar Sesión

- Debe estar disponible en la barra de navegación.
- Debe eliminar la clave/token almacenada en el navegador.

### HU-05: Vista Principal del Usuario

- Debe consultar la API para obtener los temas creados.
- Debe enlistar los temas obtenidos.

### HU-06: Acceso Rápido a Crear Tema

- Debe incluir un formulario desplegable o modal para crear un nuevo tema.

### HU-07: Formulario de Nuevo Tema

- Debe validar que el nombre no esté duplicado.
- Debe enviar la petición a la API.
- Debe actualizar el listado de temas en el estado del cliente.

### HU-08: Vista Interna del Tema

- Debe enlistar las agrupaciones creadas.
- Debe incluir el enlace o acción hacia el formulario de nuevas agrupaciones.

### HU-09: Formulario de Nueva Agrupación

- Debe validar que los campos obligatorios estén completos.
- Debe enviar la petición a la API.
- Debe definir la estructura de datos que seguirá la agrupación.

### HU-10: Vista Interna de Agrupación

- Debe ofrecer un menú para seleccionar el formato de visualización.
- Debe mostrar los datos existentes según el formato elegido.

### HU-11: Formulario de Datos

- Debe desplegarse desde la vista de la agrupación.
- Debe enviar la petición a la API.
- Debe validar que los campos obligatorios estén completos.

### HU-12: Registro Independiente (Nota/Observación)

- Debe ser una opción seleccionable dentro del formulario de agrupaciones.
- Debe enviar la petición correspondiente a la API.

### HU-13: Edición de Datos, Agrupación y Tema

- Debe habilitar campos de texto interactivos sobre el valor a modificar.
- Debe mostrar botones de Aceptar y Cancelar.
- Debe actualizar el valor en pantalla y sincronizar con la API.

### HU-14: Eliminación de Elementos

- Debe disparar una confirmación de alerta antes de proceder.
- Debe enviar la petición `DELETE` a la API.
- El botón para eliminar debe estar ubicado en un menú secundario/hamburguesa.
