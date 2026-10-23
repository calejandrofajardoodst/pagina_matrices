# Documentación técnica

Explicación completa del funcionamiento interno de **Gauss–Jordan · Laboratorio de matrices**: arquitectura, algoritmo, API, frontend, pruebas y despliegue. Está pensada para que cualquier integrante del grupo pueda entender y defender el proyecto.

---

## Índice

1. [Resumen](#1-resumen)
2. [Arquitectura general](#2-arquitectura-general)
3. [Flujo completo de una solicitud](#3-flujo-completo-de-una-solicitud)
4. [Backend](#4-backend)
5. [API](#5-api)
6. [Frontend](#6-frontend)
7. [Pruebas](#7-pruebas)
8. [Despliegue](#8-despliegue)
9. [Seguridad](#9-seguridad)
10. [Cómo extender el proyecto](#10-cómo-extender-el-proyecto)
11. [Glosario](#11-glosario)
12. [Referencias](#12-referencias)

---

## 1. Resumen

El proyecto es una aplicación web que resuelve sistemas de ecuaciones lineales de 2×2 a 5×5 con el método de Gauss–Jordan y muestra cada transformación de la matriz aumentada.

| Aspecto | Decisión |
| --- | --- |
| Backend | Python 3.12 + Django 5.2 |
| Cálculo | `fractions.Fraction` (aritmética exacta) |
| Comunicación | JSON sobre `POST /api/solve/` |
| Frontend | HTML + CSS + JavaScript vanilla |
| Persistencia | Ninguna (aplicación stateless) |
| Servidor | Gunicorn |
| Estáticos | WhiteNoise |
| Despliegue | Render (plan gratuito) |
| Pruebas | 21 pruebas con `SimpleTestCase` |
| CI | GitHub Actions |

La aplicación está publicada en <https://pagina-matrices.onrender.com>.

---

## 2. Arquitectura general

```text
┌──────────────────────────────────────────────────────────────┐
│                         Navegador                            │
│                                                              │
│  templates/index.html                                        │
│  static/css/styles.css   ← tema dorado/negro, responsive     │
│  static/js/app.js        ← estado, i18n, fetch, render        │
└──────────────────────────────┬───────────────────────────────┘
                               │ POST /api/solve/  (JSON)
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                      Servidor Django                         │
│                                                              │
│  solver/views.py                                             │
│    ├── index()       → renderiza la página                   │
│    ├── health()      → GET /health/                          │
│    └── solve_view()  → valida, resuelve y responde JSON      │
│                                                              │
│  solver/gauss_jordan.py                                      │
│    ├── parse_matrix()  → valida y convierte a Fraction       │
│    └── solve_system()  → Gauss–Jordan + registro de pasos    │
└──────────────────────────────────────────────────────────────┘
```

**Idea clave:** el navegador no calcula nada. Toda la matemática ocurre en Python y el frontend solo se encarga de la entrada y de dibujar la respuesta.

### Estructura de archivos

```text
pagina_matrices/
├── config/
│   ├── settings.py          # configuración Django
│   ├── urls.py              # URL raíz
│   └── wsgi.py              # punto de entrada para Gunicorn
├── solver/
│   ├── gauss_jordan.py      # algoritmo exacto
│   ├── views.py             # vistas HTTP
│   ├── urls.py              # rutas de la app
│   └── tests.py             # 21 pruebas
├── templates/
│   ├── index.html           # página principal
│   ├── 404.html
│   └── 500.html
├── static/
│   ├── css/styles.css
│   ├── js/app.js
│   └── img/favicon.svg
├── docs/                    # esta documentación
├── render.yaml              # blueprint de Render
├── build.sh                 # build de producción
├── Procfile
└── requirements.txt
```

---

## 3. Flujo completo de una solicitud

1. El usuario elige el tamaño y escribe la matriz aumentada.
2. JavaScript guarda cada valor en `state.valuesBySize`.
3. Al pulsar **Resolver sistema**, `solveCurrent()` construye un JSON:

   ```json
   {
     "size": 3,
     "matrix": [
       ["1", "1", "1", "6"],
       ["2", "-1", "1", "3"],
       ["1", "2", "-1", "2"]
     ]
   }
   ```

4. `fetch` envía el JSON a `POST /api/solve/` con la cabecera `X-CSRFToken`.
5. Django valida con `parse_matrix()`.
6. `solve_system()` ejecuta Gauss–Jordan y guarda cada paso.
7. La vista devuelve un JSON con `initial`, `steps`, `final`, `classification`, `solution` y `rank`.
8. `renderResults()` dibuja la clasificación, la solución y la línea de tiempo.
9. Cada paso se dibuja con `renderMatrix()`, resaltando la fila pivote, la fila modificada y el pivote.

---

## 4. Backend

### 4.1 `solver/gauss_jordan.py`

Este archivo contiene la lógica matemática y no depende de Django, por lo que se puede probar de forma aislada.

#### Constantes

```python
MIN_SIZE = 2
MAX_SIZE = 5
MAX_INPUT_LENGTH = 32
```

#### Manejo de errores

```python
class MatrixInputError(ValueError):
    def __init__(self, code, *, row=None, col=None):
        super().__init__(code)
        self.code = code      # "missing_cell", "invalid_number", ...
        self.row = row        # fila donde ocurrió el error
        self.col = col        # columna donde ocurrió el error
```

El frontend usa `row` y `col` para resaltar exactamente la celda problemática.

#### `format_fraction`

```python
def format_fraction(value: Fraction) -> str:
    if value.denominator == 1:
        return str(value.numerator)
    return f"{value.numerator}/{value.denominator}"
```

Ejemplos: `Fraction(4, 2)` → `"2"`, `Fraction(-6, 4)` → `"-3/2"`.

#### `parse_cell`

Acepta enteros, decimales y fracciones. Normaliza caracteres que suelen aparecer al copiar y pegar:

```python
text = (
    text.replace("\u2212", "-")   # signo menos Unicode
    .replace("\u2013", "-")       # guion medio
    .replace("\u2014", "-")       # guion largo
    .replace("\u00a0", "")        # espacio duro
    .replace(" ", "")
    .replace(",", ".")            # coma decimal
)
return Fraction(text)
```

Si el texto no se puede convertir, lanza `MatrixInputError("invalid_number", ...)`.

#### `parse_matrix`

Valida la estructura completa:

- `size` debe ser un entero entre 2 y 5.
- `matrix` debe tener exactamente `size` filas.
- Cada fila debe tener exactamente `size + 1` columnas (coeficientes + término independiente).
- Cada celda se convierte con `parse_cell`.

#### `solve_system`

El algoritmo completo:

```python
size = len(matrix)
augmented = [row[:] for row in matrix]
initial = _snapshot(augmented)
steps = []
pivot_columns = []
pivot_row = 0

for column in range(size):
    if pivot_row >= size:
        break

    # 1. Pivoteo parcial: la fila con mayor valor absoluto
    pivot = max(
        range(pivot_row, size),
        key=lambda candidate: abs(augmented[candidate][column]),
    )
    if augmented[pivot][column] == 0:
        continue  # variable libre

    # 2. Intercambio si hace falta
    if pivot != pivot_row:
        augmented[pivot_row], augmented[pivot] = augmented[pivot], augmented[pivot_row]
        steps.append(_record_step("swap", pivot_row, pivot, None, augmented, (pivot_row, column)))

    # 3. Normalización: el pivote se convierte en 1
    pivot_value = augmented[pivot_row][column]
    if pivot_value != 1:
        multiplier = Fraction(1, 1) / pivot_value
        augmented[pivot_row] = [value * multiplier for value in augmented[pivot_row]]
        steps.append(_record_step("scale", pivot_row, pivot_row, multiplier, augmented, (pivot_row, column)))

    # 4. Eliminación en TODAS las demás filas
    for row in range(size):
        if row == pivot_row:
            continue
        factor = augmented[row][column]
        if factor == 0:
            continue
        augmented[row] = [
            augmented[row][index] - factor * augmented[pivot_row][index]
            for index in range(size + 1)
        ]
        steps.append(_record_step("eliminate", row, pivot_row, factor, augmented, (pivot_row, column)))

    pivot_columns.append(column)
    pivot_row += 1
```

#### Clasificación del sistema

Después del bucle:

```python
rank = len(pivot_columns)

inconsistent = any(
    all(augmented[row][column] == 0 for column in range(size))
    and augmented[row][size] != 0
    for row in range(size)
)
```

| Condición | `classification` | Significado |
| --- | --- | --- |
| Existe una fila `0 = c` con `c ≠ 0` | `none` | Sistema incompatible |
| `rank < size` | `infinite` | Variables libres |
| `rank == size` | `unique` | Una solución por incógnita |

Si la solución es única, se lee la última columna:

```python
values = [None] * size
for row, column in enumerate(pivot_columns):
    values[column] = augmented[row][size]
solution = [format_fraction(value) for value in values]
```

#### Formato de cada paso

```json
{
  "kind": "eliminate",
  "target": 1,
  "source": 0,
  "factor": "2",
  "pivot": [0, 0],
  "matrix": [
    ["1", "1", "1", "6"],
    ["0", "-3", "-1", "-9"],
    ["1", "2", "-1", "2"]
  ]
}
```

| Campo | Significado |
| --- | --- |
| `kind` | `swap`, `scale` o `eliminate` |
| `target` | fila que se modifica (índice desde 0) |
| `source` | fila pivote que se usa |
| `factor` | escalar exacto de la operación |
| `pivot` | posición `[fila, columna]` del pivote |
| `matrix` | matriz aumentada después de la operación |

#### Pseudocódigo resumido

```text
Para cada columna:
    elegir la fila con el mayor |valor| en esa columna
    si el pivote es cero: continuar con la siguiente columna
    intercambiar filas si es necesario
    dividir la fila pivote entre el pivote
    para cada otra fila:
        restar el múltiplo necesario para anular la entrada
Clasificar según el rango y las filas inconsistentes
```

#### Ejemplo de traza (2×2)

Sistema:

```text
2x +  y = 5
 x -  y = 1
```

Matriz aumentada inicial:

```text
[ 2   1 | 5 ]
[ 1  -1 | 1 ]
```

Paso 1 — escalamiento `F₁ ← ½ F₁`:

```text
[ 1  1/2 | 5/2 ]
[ 1   -1 |  1  ]
```

Paso 2 — eliminación `F₂ ← F₂ − F₁`:

```text
[ 1  1/2 |  5/2 ]
[ 0 -3/2 | -3/2 ]
```

Paso 3 — escalamiento `F₂ ← −⅔ F₂`:

```text
[ 1  1/2 | 5/2 ]
[ 0   1  |  1  ]
```

Paso 4 — eliminación `F₁ ← F₁ − ½ F₂`:

```text
[ 1  0 | 2 ]
[ 0  1 | 1 ]
```

Solución: `x₁ = 2`, `x₂ = 1`.

### 4.2 `solver/views.py`

```python
@require_GET
def index(request):
    return render(request, "index.html")

@require_GET
def health(_request):
    return JsonResponse({"status": "ok"})

@require_POST
@csrf_protect
def solve_view(request):
    if len(request.body) > MAX_BODY_BYTES:
        return JsonResponse({"ok": False, "error": "payload_too_large"}, status=413)
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return JsonResponse({"ok": False, "error": "invalid_json"}, status=400)
    try:
        matrix = parse_matrix(payload)
        return JsonResponse(solve_system(matrix))
    except MatrixInputError as exc:
        return JsonResponse({
            "ok": False,
            "error": exc.code,
            "row": exc.row,
            "col": exc.col,
        }, status=400)
    except Exception:
        logger.exception("Unexpected error while solving a matrix")
        return JsonResponse({"ok": False, "error": "server_error"}, status=500)
```

Puntos importantes:

- `require_GET` y `require_POST` restringen los métodos HTTP.
- `csrf_protect` exige el token CSRF.
- El tamaño del cuerpo se limita a 32 KB.
- Los errores de validación devuelven 400 con código y coordenadas.
- Cualquier error inesperado devuelve 500 sin exponer detalles internos.

### 4.3 `config/settings.py`

Decisiones destacadas:

```python
INSTALLED_APPS = [
    "django.contrib.staticfiles",
    "solver",
]

DATABASES = {}  # sin base de datos
```

No se instalan `admin`, `auth`, `sessions` ni `messages` porque la aplicación no los necesita. Esto evita migraciones y simplifica el despliegue.

Middleware:

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.middleware.gzip.GZipMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
```

Estáticos:

```python
STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}
```

Seguridad en producción:

```python
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
X_FRAME_OPTIONS = "DENY"
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SECURE_HSTS_SECONDS = 31536000 if not DEBUG else 0
```

### 4.4 `solver/urls.py`

```python
urlpatterns = [
    path("", views.index, name="index"),
    path("api/solve/", views.solve_view, name="solve"),
    path("health/", views.health, name="health"),
]
```

---

## 5. API

### `POST /api/solve/`

**Petición**

```json
{
  "size": 2,
  "matrix": [
    ["2", "1", "5"],
    ["1", "-1", "1"]
  ]
}
```

**Respuesta exitosa (200)**

```json
{
  "ok": true,
  "size": 2,
  "initial": [["2", "1", "5"], ["1", "-1", "1"]],
  "steps": [
    {
      "kind": "scale",
      "target": 0,
      "source": 0,
      "factor": "1/2",
      "pivot": [0, 0],
      "matrix": [["1", "1/2", "5/2"], ["1", "-1", "1"]]
    }
  ],
  "final": [["1", "0", "2"], ["0", "1", "1"]],
  "classification": "unique",
  "solution": ["2", "1"],
  "rank": 2
}
```

**Errores**

| HTTP | `error` | Causa |
| --- | --- | --- |
| 400 | `missing_cell` | Alguna celda está vacía |
| 400 | `invalid_number` | El valor no es entero, decimal ni fracción |
| 400 | `invalid_size` | El tamaño no está entre 2 y 5 |
| 400 | `invalid_matrix` | Filas o columnas no coinciden con el tamaño |
| 400 | `invalid_json` | El cuerpo no es JSON válido |
| 413 | `payload_too_large` | El cuerpo supera 32 KB |
| 500 | `server_error` | Error inesperado |

Cuando aplica, la respuesta incluye `row` y `col` con la posición del error.

### `GET /health/`

```json
{ "status": "ok" }
```

Se usa como health check en Render.

### Ejemplos con `curl`

```bash
curl -X POST https://pagina-matrices.onrender.com/api/solve/ \
  -H "Content-Type: application/json" \
  -d '{"size":2,"matrix":[["2","1","5"],["1","-1","1"]]}'
```

> El endpoint requiere el token CSRF de la página, por lo que desde `curl` conviene probar solo el health check o usar la interfaz web.

---

## 6. Frontend

### 6.1 `templates/index.html`

La página tiene cinco zonas:

1. **Cabecera fija:** marca, navegación, switch ES/EN y botón de tema.
2. **Hero:** título, descripción, insignias y una matriz decorativa.
3. **Resolutor:** selector de tamaño, cuadrícula de entrada, botones y panel de ayuda.
4. **Resultados:** clasificación, solución y línea de tiempo (ocultos al inicio).
5. **Método y footer:** explicación de las operaciones y enlaces.

Los textos usan atributos `data-i18n`, `data-i18n-aria-label` y `data-i18n-placeholder` para que JavaScript los traduzca sin recargar la página.

### 6.2 `static/css/styles.css`

Sistema de diseño basado en variables:

```css
:root {
  --gold: #d6b25e;
  --gold-text: #d6b25e;
  --gold-bright: #f2d27a;
  --bg: #070707;
  --panel: rgba(17, 16, 14, 0.84);
  --text: #f4efe3;
  --muted: #a69e8f;
}

[data-theme="light"] {
  --gold: #b8860b;
  --gold-text: #8a6210;
  --gold-bright: #7a560c;
  --bg: #f7f2e6;
  --text: #19150e;
}
```

- El tema se controla con `data-theme="dark"` o `data-theme="light"` en `<html>`.
- Los colores de texto usan `--gold-text` para mantener buen contraste en ambos temas.
- El fondo combina gradientes dorados y una cuadrícula sutil.
- La matriz se dibuja con corchetes hechos con CSS y tablas con `border-spacing`.
- Las fracciones usan `.frac`, `.num` y `.den` para apilar numerador y denominador.

### 6.3 `static/js/app.js`

El archivo está organizado en secciones:

1. Traducciones.
2. Ejemplos.
3. Estado y utilidades.
4. Tema e idioma.
5. Editor de matrices.
6. Errores y carga.
7. Renderizado de matrices.
8. Resultados.
9. Resolución.
10. Portapapeles y avisos.
11. Eventos.
12. Inicialización.

#### Estado

```js
const state = {
  size: 3,
  lang: "es",
  theme: "dark",
  valuesBySize: {},   // una matriz por cada tamaño
  values: null,       // referencia a la matriz activa
  result: null,       // último resultado del backend
  lastError: null,
  toastTimer: 0,
};
```

`valuesBySize` conserva lo que el usuario escribió en cada tamaño. Si cambia de 3×3 a 5×5 y vuelve, recupera sus valores.

#### Internacionalización

```js
const translations = {
  es: { "hero.title1": "Resuelve sistemas", ... },
  en: { "hero.title1": "Solve linear systems", ... },
};

function t(key, variables) {
  let text = (translations[state.lang] || translations.es)[key];
  // reemplaza {row}, {col}, {count}, etc.
  return text;
}
```

- `applyTranslations()` recorre `[data-i18n]` y actualiza el texto.
- `setLanguage()` guarda la preferencia en `localStorage` y vuelve a dibujar la matriz y los resultados.
- El idioma inicial se lee de `<html lang>`.

#### Tema

```js
function setTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("gj-theme", theme);
  updateThemeLabel();
}
```

El script en `<head>` aplica el tema guardado antes de pintar para evitar parpadeos.

#### Editor de matrices

`buildMatrixEditor()` genera una tabla con:

- encabezados `x₁ … xₙ` y `b`,
- etiquetas de fila `F₁ … Fₙ` (o `R₁ … Rₙ` en inglés),
- un separador punteado antes de la columna `b`,
- entradas con `data-row` y `data-col`.

El evento `input` se maneja por delegación desde `#matrix-editor`, así que sigue funcionando aunque la tabla se reconstruya.

#### Resolución

```js
async function solveCurrent() {
  clearError();
  const matrix = readMatrix();
  if (!validateValues(matrix)) return;

  setLoading(true);
  try {
    const response = await fetch("/api/solve/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
      body: JSON.stringify({ size: state.size, matrix }),
    });
    const data = await response.json();
    if (!response.ok || data.ok === false) {
      showError(ERROR_KEYS[data.error] || "error.generic", data);
      return;
    }
    renderResults(data);
  } catch (error) {
    showError("error.network");
  } finally {
    setLoading(false);
  }
}
```

#### Renderizado de resultados

`renderResults(data)` hace lo siguiente:

1. Elige el título, subtítulo, color e icono según `classification`.
2. Dibuja las incógnitas con `fractionHTML`.
3. Escribe la nota con el rango.
4. Genera la tarjeta inicial.
5. Genera una tarjeta por cada paso con `notationHTML` y `renderMatrix`.
6. Genera la tarjeta final (RREF).
7. Muestra la sección y hace scroll.

#### Fracciones sin LaTeX

```js
function fractionHTML(value) {
  let sign = "";
  let body = String(value);
  if (body.startsWith("-")) {
    sign = "−";
    body = body.slice(1);
  }
  if (body.includes("/")) {
    const [numerator, denominator] = body.split("/");
    return (
      sign +
      '<span class="frac" aria-hidden="true">' +
      `<span class="num">${numerator}</span>` +
      `<span class="den">${denominator}</span>` +
      "</span>" +
      `<span class="sr-only">${value}</span>`
    );
  }
  return sign + body;
}
```

El `sr-only` permite que un lector de pantalla anuncie `-3/4` correctamente.

#### Resaltado de filas

`renderMatrix(matrix, { target, source, pivot })` agrega clases:

- `is-target` a la fila que se modifica,
- `is-source` a la fila pivote,
- `is-pivot` a la celda del pivote.

El CSS se encarga de los colores.

---

## 7. Pruebas

`solver/tests.py` usa `SimpleTestCase` porque no hay base de datos. Cubre:

- solución única 2×2, 3×3, 4×4 y 5×5,
- intercambio de filas cuando el pivote inicial es cero,
- sistema incompatible,
- sistema con infinitas soluciones,
- entradas fraccionarias y decimales con coma,
- registro de escalamiento y eliminación,
- estructura completa de cada paso,
- errores de celda vacía, número inválido, tamaño y forma,
- endpoints `/`, `/health/` y `/api/solve/`,
- respuesta ante JSON inválido.

Comandos:

```bash
python manage.py check
python manage.py test -v 2
```

GitHub Actions ejecuta exactamente lo mismo en cada push y pull request.

---

## 8. Despliegue

### Archivos

`render.yaml`:

```yaml
services:
  - type: web
    name: pagina-matrices
    runtime: python
    plan: free
    buildCommand: "./build.sh"
    startCommand: "gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 60"
    healthCheckPath: /health/
    autoDeployTrigger: commit
    envVars:
      - key: PYTHON_VERSION
        value: "3.12.3"
      - key: DEBUG
        value: "0"
      - key: SECRET_KEY
        generateValue: true
      - key: ALLOWED_HOSTS
        value: ".onrender.com"
      - key: CSRF_TRUSTED_ORIGINS
        value: "https://*.onrender.com"
```

`build.sh`:

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python manage.py collectstatic --noinput
```

### Pasos para desplegar

1. Entrar a <https://render.com> con GitHub.
2. **New → Blueprint**.
3. Elegir el repositorio `pagina_matrices`.
4. Poner un nombre único al Blueprint, por ejemplo `pagina-matrices-gauss-jordan`.
5. Rama `main`, archivo `render.yaml`.
6. **Apply** y esperar el build.
7. Abrir la URL `https://pagina-matrices.onrender.com`.

### Consideraciones

- El plan gratuito suspende el servicio por inactividad.
- La primera visita puede tardar unos segundos.
- Si se usa un dominio propio, hay que actualizar `ALLOWED_HOSTS` y `CSRF_TRUSTED_ORIGINS`.
- Los archivos estáticos se sirven con WhiteNoise; no hace falta un CDN.

---

## 9. Seguridad

| Medida | Implementación |
| --- | --- |
| CSRF | Token en el formulario y cabecera `X-CSRFToken` |
| Validación de entrada | `parse_matrix` y `parse_cell` |
| Límite de tamaño | 32 KB por petición |
| Hosts permitidos | `ALLOWED_HOSTS` por variable de entorno |
| HTTPS | Render + `SECURE_PROXY_SSL_HEADER` |
| Cookies seguras | `CSRF_COOKIE_SECURE` y `SESSION_COOKIE_SECURE` en producción |
| HSTS | `SECURE_HSTS_SECONDS` en producción |
| Clickjacking | `X-Frame-Options: DENY` |
| MIME sniffing | `SECURE_CONTENT_TYPE_NOSNIFF` |
| Secretos | `SECRET_KEY` generada por Render, nunca en el repositorio |

---

## 10. Cómo extender el proyecto

### Agregar matrices de 6×6

1. Cambiar `MAX_SIZE = 6` en `solver/gauss_jordan.py`.
2. Agregar el botón `6×6` en `templates/index.html`.
3. Agregar un ejemplo en `examples` de `static/js/app.js`.
4. Agregar pruebas para el nuevo tamaño.
5. Verificar que la cuadrícula sea legible en móvil.

### Mostrar la solución paramétrica

Cuando `classification == "infinite"`, se pueden identificar las columnas sin pivote y expresar las variables libres. Requiere extender `solve_system` para devolver la relación entre variables pivote y libres, y agregar el renderizado en el frontend.

### Modo decimal

Se puede agregar una opción para mostrar los resultados como decimales redondeados, manteniendo `Fraction` internamente. El cambio es solo de presentación en `format_fraction`.

### Exportar a PDF o imagen

Se puede usar la impresión del navegador (`window.print()`), que ya tiene estilos de impresión, o generar un PDF en el backend con una librería como ReportLab.

### Historial de cálculos

Como no hay base de datos, el historial se puede guardar en `localStorage` en el navegador. Si se quiere compartir entre dispositivos, habría que agregar una base de datos y autenticación.

---

## 11. Glosario

| Término | Definición |
| --- | --- |
| Matriz aumentada | Matriz de coeficientes con la columna de términos independientes `[A \| b]` |
| Pivote | Primer elemento distinto de cero de una fila en la forma escalonada |
| Pivoteo parcial | Elegir como pivote la fila con mayor valor absoluto de la columna |
| Operación elemental | Intercambiar filas, escalar una fila o sumar un múltiplo de otra |
| RREF | Forma escalonada reducida por filas |
| Rango | Número de filas no nulas de la forma escalonada |
| Sistema compatible | Tiene al menos una solución |
| Sistema incompatible | No tiene solución |
| Variable libre | Variable sin pivote asociado; puede tomar cualquier valor |
| Fracción exacta | Representación `a/b` sin redondeo |
| Stateless | La aplicación no guarda estado entre peticiones |
| CSRF | Ataque que se mitiga con un token por sesión |
| WhiteNoise | Middleware que sirve archivos estáticos desde Django |

---

## 12. Referencias

- Django 5.2 — <https://docs.djangoproject.com/es/5.2/>
- `fractions.Fraction` — <https://docs.python.org/3/library/fractions.html>
- WhiteNoise — <https://whitenoise.readthedocs.io/>
- Render Blueprints — <https://render.com/docs/blueprint-spec>
- Gauss–Jordan (Khan Academy) — <https://es.khanacademy.org/math/linear-algebra>
- Documentación del propio proyecto: [EQUIPO.md](EQUIPO.md), [GUIA_EXPOSICION.md](GUIA_EXPOSICION.md), [CONTRIBUTING.md](../CONTRIBUTING.md)
