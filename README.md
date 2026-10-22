# Gauss–Jordan · Laboratorio de matrices

Aplicación web para resolver sistemas de ecuaciones lineales de **2×2, 3×3, 4×4 y 5×5** mediante el método de **Gauss–Jordan**. Muestra la matriz aumentada inicial, cada transformación intermedia, la operación entre filas realizada y la forma escalonada reducida final.

Diseño en **dorado y negro**, con tema claro/oscuro, interfaz bilingüe **español/inglés**, fracciones exactas y una visualización paso a paso pensada para estudiar el método.

> Repositorio: <https://github.com/calejandrofajardoodst/pagina_matrices>

---

## Características

- Resolución exacta con `fractions.Fraction`: no hay errores de redondeo.
- Tamaños de 2×2 a 5×5 con entrada dinámica.
- Pivoteo parcial para mejorar la estabilidad numérica.
- Registro completo de operaciones:
  - intercambio de filas,
  - normalización del pivote,
  - eliminación por encima y por debajo del pivote.
- Clasificación del sistema: solución única, infinitas soluciones o sin solución.
- Visualización de cada matriz con filas y pivotes resaltados.
- Cambio de idioma ES/EN y tema claro/oscuro persistentes.
- Diseño responsive, accesible y sin dependencias externas de JavaScript/CSS.
- Backend Django sin base de datos: la aplicación es completamente stateless.
- Pruebas automatizadas y despliegue preparado para Render.

---

## Tecnologías

| Capa | Herramienta |
| --- | --- |
| Backend | Python 3.12 · Django 5.2 |
| Servidor | Gunicorn |
| Archivos estáticos | WhiteNoise |
| Frontend | HTML, CSS y JavaScript vanilla |
| Pruebas | Django TestCase |
| Despliegue | Render |
| CI | GitHub Actions |

---

## Cómo funciona

1. El usuario elige el tamaño y escribe la matriz aumentada `[A | b]`.
2. El frontend envía `size` y `matrix` a `POST /api/solve/`.
3. El backend valida las entradas y las convierte a fracciones exactas.
4. Se ejecuta Gauss–Jordan con pivoteo parcial.
5. Cada operación se guarda junto con una copia completa de la matriz resultante.
6. El frontend representa la línea de tiempo con las operaciones y matrices.
7. Al final se clasifica el sistema y, si la solución es única, se muestran los valores de las incógnitas.

### Reglas de clasificación

| Situación | Resultado |
| --- | --- |
| `rango(A) = rango(A\|b) = n` | Solución única |
| `rango(A) = rango(A\|b) < n` | Infinitas soluciones |
| `rango(A) < rango(A\|b)` | Sin solución |

### Ejemplo de respuesta de la API

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

Los tipos de paso son `swap`, `scale` y `eliminate`.

---

## Ejecutar en local

Requisitos: Python 3.12 o superior.

```bash
python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

python manage.py runserver
```

Abre <http://127.0.0.1:8000>.

> En Ubuntu, si `python3 -m venv` falla porque falta `ensurepip`, instala `python3-venv` con `sudo apt install python3.12-venv`, o crea el entorno con `python3 -m venv --without-pip .venv` y ejecuta `python /ruta/a/get-pip.py` dentro del entorno.

### Variables de entorno

| Variable | Valor por defecto | Uso |
| --- | --- | --- |
| `DEBUG` | `1` | `0` en producción |
| `SECRET_KEY` | clave de desarrollo | Render la genera automáticamente |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1,.onrender.com` | hosts permitidos, separados por coma |
| `CSRF_TRUSTED_ORIGINS` | `https://*.onrender.com` | orígenes de confianza |
| `SECURE_SSL_REDIRECT` | `0` | activar redirección HTTPS |
| `SECURE_HSTS` | `1` | HSTS cuando `DEBUG=0` |
| `LOG_LEVEL` | `INFO` | nivel de logs |

---

## Pruebas

```bash
python manage.py check
python manage.py test -v 2
```

La suite cubre:

- sistemas únicos de 2×2 a 5×5,
- intercambio de filas cuando el pivote inicial es cero,
- sistemas incompatibles,
- sistemas con infinitas soluciones,
- entradas fraccionarias y decimales,
- operaciones de escalamiento y eliminación,
- validación de celdas y formas de la matriz,
- endpoints `/api/solve/` y `/health/`.

---

## Despliegue en Render

El repositorio incluye `render.yaml` y `build.sh`, así que el despliegue se puede hacer con un **Blueprint**:

1. Entra a <https://render.com> y crea una cuenta con GitHub.
2. Selecciona **New → Blueprint**.
3. Conecta el repositorio `pagina_matrices`.
4. Render detecta `render.yaml` y crea el servicio web.
5. Espera la build y abre la URL `https://pagina-matrices.onrender.com` (el nombre puede variar).
6. Si usas un dominio propio, agrega el dominio en **Settings → Custom Domains** y actualiza `ALLOWED_HOSTS` y `CSRF_TRUSTED_ORIGINS` con ese dominio.

Consideraciones del plan gratuito de Render:

- El servicio se suspende después de un periodo de inactividad.
- La primera visita posterior puede tardar unos segundos en despertar.
- Para una exposición académica, abre la página unos minutos antes.

También se incluye un `Procfile` para plataformas compatibles con buildpacks. Si prefieres **PythonAnywhere**, el proyecto funciona sin base de datos: crea una app web con Python 3.12, sube el código, instala `requirements.txt`, configura el WSGI para apuntar a `config.wsgi.application` y agrega la ruta de archivos estáticos.

### ¿Y GitHub Pages?

GitHub Pages solo aloja archivos estáticos y **no puede ejecutar Django ni Python**. Por eso este proyecto se despliega en Render. GitHub Pages podría alojar una página informativa que enlace a la aplicación, pero no el resolutor completo.

---

## Estructura

```text
pagina_matrices/
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── solver/
│   ├── gauss_jordan.py     # algoritmo exacto y registro de pasos
│   ├── views.py            # página principal, API y health check
│   ├── urls.py
│   └── tests.py
├── templates/
│   └── index.html
├── static/
│   ├── css/styles.css
│   ├── js/app.js
│   └── img/favicon.svg
├── .github/workflows/tests.yml
├── build.sh
├── render.yaml
├── requirements.txt
└── manage.py
```

---

## Detalles de implementación

- **Precisión exacta:** todas las entradas se convierten a `Fraction`. Se aceptan enteros (`2`), fracciones (`-3/4`) y decimales (`0.5`, `1,5`).
- **Pivoteo parcial:** en cada columna se elige la fila con mayor valor absoluto entre las disponibles. Si toda la columna es cero, se continúa con la siguiente y la variable correspondiente queda libre.
- **Gauss–Jordan completo:** después de normalizar el pivote, se eliminan todas las demás filas, no solo las inferiores. Así se obtiene directamente la forma escalonada reducida.
- **Sin base de datos:** no se usan usuarios, sesiones ni modelos. Esto simplifica el despliegue y evita migraciones.
- **CSRF:** el formulario incluye el token de Django y el JavaScript lo envía en la cabecera `X-CSRFToken`.

---

## Uso académico

Proyecto desarrollado para el curso de álgebra lineal. Puedes adaptar los textos, colores y ejemplos desde:

- `templates/index.html` para la estructura,
- `static/css/styles.css` para el tema dorado/negro,
- `static/js/app.js` para las traducciones y la interacción,
- `solver/gauss_jordan.py` para el algoritmo.

Si el repositorio se trabaja en grupo, se recomienda crear una rama por integrante y abrir un pull request hacia `main`. El workflow de GitHub Actions ejecuta las pruebas en cada push y pull request.
