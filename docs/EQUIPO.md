# Equipo y roles

Este documento describe cómo se repartió el trabajo del proyecto **Gauss–Jordan · Laboratorio de matrices** entre los 5 integrantes y qué evidencia deja cada rol en el repositorio.

> **Integrantes:** Gabriel, Carlos y Samuel en backend; Carlos Fajardo y Jiostin en frontend.

---

## Distribución general

| Integrante | Área | Rol principal | Rama sugerida |
| --- | --- | --- | --- |
| Gabriel | Backend | Núcleo matemático | `backend/algoritmo` |
| Carlos | Backend | API y validaciones | `backend/api` |
| Samuel | Backend | Despliegue y calidad | `backend/deploy` |
| Carlos Fajardo | Frontend | Estructura y diseño visual | `frontend/diseno` |
| Jiostin | Frontend | Interacción e internacionalización | `frontend/interaccion` |

---

## Backend

### Gabriel · Núcleo matemático

**Archivos principales**

- `solver/gauss_jordan.py`
- `solver/tests.py` (pruebas del algoritmo)

**Responsabilidades**

- Definir la representación exacta de la matriz aumentada con `fractions.Fraction`.
- Implementar la validación de cada celda: enteros, decimales y fracciones.
- Implementar Gauss–Jordan con pivoteo parcial.
- Registrar cada operación (`swap`, `scale`, `eliminate`) con la matriz resultante.
- Calcular el rango y clasificar el sistema: solución única, infinitas soluciones o sin solución.
- Escribir las pruebas de 2×2 a 5×5, sistemas singulares y entradas fraccionarias.

**Preguntas que debe poder responder**

- ¿Qué es un pivote y por qué se elige el de mayor valor absoluto?
- ¿Por qué se usa `Fraction` en lugar de `float`?
- ¿Cómo se detecta que un sistema no tiene solución?
- ¿Cómo se calcula el rango de la matriz?

### Carlos · API y validaciones

**Archivos principales**

- `solver/views.py`
- `solver/urls.py`
- `config/urls.py`
- `solver/tests.py` (pruebas de endpoints)

**Responsabilidades**

- Exponer la página principal con la vista `index`.
- Implementar el endpoint `POST /api/solve/`.
- Validar el cuerpo de la petición y devolver errores claros (`invalid_size`, `missing_cell`, `invalid_number`, `invalid_matrix`, `invalid_json`).
- Proteger el endpoint con CSRF y limitar el tamaño de la petición.
- Implementar el health check `GET /health/`.
- Probar la API con el cliente de pruebas de Django.

**Preguntas que debe poder responder**

- ¿Qué recibe y qué devuelve `/api/solve/`?
- ¿Cómo se protege el endpoint contra peticiones maliciosas?
- ¿Qué diferencia hay entre un error 400 y un error 500?
- ¿Cómo se prueba una vista sin levantar el servidor?

### Samuel · Despliegue y calidad

**Archivos principales**

- `config/settings.py`
- `render.yaml`
- `build.sh`
- `Procfile`
- `.github/workflows/tests.yml`
- `requirements.txt`

**Responsabilidades**

- Configurar Django sin base de datos y con variables de entorno.
- Configurar WhiteNoise para servir los archivos estáticos en producción.
- Preparar Gunicorn y el arranque del servicio.
- Definir el Blueprint de Render (`render.yaml`) con las variables seguras.
- Mantener el workflow de GitHub Actions que ejecuta `check` y las pruebas.
- Documentar el despliegue y el uso de variables de entorno.

**Preguntas que debe poder responder**

- ¿Por qué la aplicación no necesita base de datos?
- ¿Qué hace `collectstatic` y por qué es necesario en Render?
- ¿Cómo se protege la `SECRET_KEY` en producción?
- ¿Qué hace el health check y para qué sirve?

---

## Frontend

### Carlos Fajardo · Estructura y diseño visual

**Archivos principales**

- `templates/index.html`
- `templates/404.html`
- `templates/500.html`
- `static/css/styles.css`
- `static/img/favicon.svg`

**Responsabilidades**

- Construir la estructura semántica de la página: hero, resolutor, resultados, método y footer.
- Definir el sistema de diseño dorado y negro con variables CSS.
- Implementar el tema claro/oscuro.
- Asegurar el diseño responsive en escritorio, tableta y móvil.
- Cuidar la accesibilidad: foco visible, etiquetas ARIA, contraste, `prefers-reduced-motion`.
- Crear las páginas de error 404 y 500.

**Preguntas que debe poder responder**

- ¿Cómo se logra el cambio entre tema claro y oscuro sin recargar la página?
- ¿Qué decisiones de diseño ayudan a que la matriz sea legible?
- ¿Cómo se adapta la interfaz a pantallas pequeñas?
- ¿Qué mejoras de accesibilidad se aplicaron?

### Jiostin · Interacción e internacionalización

**Archivos principales**

- `static/js/app.js`

**Responsabilidades**

- Construir dinámicamente la cuadrícula de entrada según el tamaño elegido.
- Mantener el estado de cada tamaño de matriz y conservar los valores al cambiar de tamaño.
- Enviar los datos al backend con `fetch` y manejar los errores.
- Renderizar la línea de tiempo de transformaciones con matrices y fracciones apiladas.
- Implementar el cambio de idioma español/inglés y su persistencia.
- Implementar ejemplos, navegación con teclado, pegado de matrices y copiado de la solución.

**Preguntas que debe poder responder**

- ¿Cómo se guarda el estado de la matriz mientras el usuario escribe?
- ¿Cómo se renderiza una fracción como `-3/4` sin usar LaTeX?
- ¿Cómo funciona el cambio de idioma y cómo se recuerda la preferencia?
- ¿Cómo se resaltan la fila pivote y la fila modificada en cada paso?

---

## Evidencia de participación

Cada integrante debe dejar registro de su trabajo con al menos una rama y un pull request:

1. Crear la rama sugerida desde `main`.
2. Hacer al menos un cambio significativo relacionado con su rol.
3. Abrir un pull request con el formato de `.github/pull_request_template.md`.
4. Pedir a otro integrante que revise y apruebe.
5. Hacer merge a `main`.

Revisa [CONTRIBUTING.md](../CONTRIBUTING.md) para ver los comandos exactos.

---

## Reparto sugerido para la exposición

| Sección | Minutos | Responsable |
| --- | --- | --- |
| Introducción y objetivo | 1 | Carlos Fajardo |
| El problema y el método | 2 | Gabriel |
| Demo en vivo | 4 | Jiostin |
| El algoritmo por dentro | 3 | Gabriel y Carlos |
| Arquitectura, pruebas y despliegue | 2 | Samuel |
| Cierre y preguntas | 2 | Todo el equipo |

La guía detallada está en [GUIA_EXPOSICION.md](GUIA_EXPOSICION.md).
