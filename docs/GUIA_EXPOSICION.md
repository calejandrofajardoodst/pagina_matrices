# Guía de exposición

Guía práctica para presentar el proyecto **Gauss–Jordan · Laboratorio de matrices** en grupo. Incluye guion, demo en vivo, reparto por integrante, preguntas probables y plan de respaldo.

- **Duración sugerida:** 12 a 15 minutos + preguntas.
- **Aplicación en vivo:** <https://pagina-matrices.onrender.com>
- **Repositorio:** <https://github.com/calejandrofajardoodst/pagina_matrices>
- **Reparto de roles:** [EQUIPO.md](EQUIPO.md)

---

## 1. Antes de la exposición

### Checklist técnico

- [ ] Abrir la aplicación en vivo unos 5 minutos antes: el plan gratuito de Render se suspende por inactividad y la primera visita puede tardar.
- [ ] Verificar que la página carga y que el botón **Resolver sistema** responde.
- [ ] Tener abierta una segunda pestaña con el repositorio de GitHub.
- [ ] Tener listo el respaldo local (ver sección 7).
- [ ] Probar el proyector o compartir pantalla con la letra grande.
- [ ] Silenciar notificaciones.

### Materiales sugeridos

- Una diapositiva de portada con el nombre del proyecto y los integrantes.
- Una diapositiva con el sistema de ejemplo de 3×3.
- Una diapositiva final con la URL y el código QR del repositorio.

---

## 2. Guion sugerido

| Bloque | Minutos | Responsable |
| --- | --- | --- |
| 1. Introducción y objetivo | 1 | Carlos Fajardo (Frontend) |
| 2. El problema y el método | 2 | Gabriel (Backend) |
| 3. Demo en vivo | 4 | Jiostin (Frontend) |
| 4. El algoritmo por dentro | 3 | Gabriel y Carlos (Backend) |
| 5. Arquitectura, pruebas y despliegue | 2 | Samuel (Backend) |
| 6. Cierre y preguntas | 2 | Todo el equipo |

---

## 3. Bloque 1 · Introducción y objetivo

**Duración:** 1 minuto.
**Responsable:** Carlos Fajardo (Frontend).

**Qué decir:**

> Buenos días. Somos el grupo de álgebra lineal y presentamos **Gauss–Jordan · Laboratorio de matrices**, una aplicación web que resuelve sistemas de ecuaciones de 2×2 hasta 5×5 mostrando cada transformación de la matriz aumentada.
>
> La idea no es solo dar el resultado, sino enseñar el procedimiento: el usuario ve la operación entre filas, la matriz antes y después, y la clasificación final del sistema. La aplicación está publicada en Render y el código está en GitHub.

**Qué mostrar:** la página de inicio, sin interactuar todavía. Señalar el título, las insignias y la matriz de ejemplo.

---

## 4. Bloque 2 · El problema y el método

**Duración:** 2 minutos.
**Responsable:** Gabriel (Backend).

**Qué decir:**

> Un sistema de ecuaciones se puede escribir como una matriz aumentada `[A | b]`. El método de Gauss–Jordan aplica operaciones elementales entre filas para llegar a la forma escalonada reducida, donde la solución se lee directamente.
>
> Las tres operaciones elementales son:
> 1. Intercambiar dos filas.
> 2. Multiplicar una fila por un escalar distinto de cero.
> 3. Sumar a una fila un múltiplo de otra.
>
> El punto clave es que estas operaciones **no cambian el conjunto solución**. En el proyecto se registran todas para que el estudiante vea el proceso completo.

**Qué mostrar:** la sección **El método** al final de la página, con las tres tarjetas: matriz aumentada, operaciones elementales y forma reducida.

**Idea para la pizarra:** escribir el sistema de ejemplo y su matriz aumentada:

```text
 x +  y +  z = 6
2x -  y +  z = 3
 x + 2y -  z = 2

[ 1  1  1 | 6 ]
[ 2 -1  1 | 3 ]
[ 1  2 -1 | 2 ]
```

---

## 5. Bloque 3 · Demo en vivo

**Duración:** 4 minutos.
**Responsable:** Jiostin (Frontend).

### Paso a paso de la demo

1. **Página principal.** Mostrar la matriz de ejemplo de 3×3 ya cargada.
2. **Resolver sistema.** Pulsar el botón dorado. Esperar la línea de tiempo.
3. **Señalar la clasificación.** Arriba aparece **Solución única** y la solución `x₁ = 1`, `x₂ = 2`, `x₃ = 3`.
4. **Mostrar la primera transformación.** Señalar el intercambio `F₁ ↔ F₂`, la fila resaltada y el pivote con borde dorado.
5. **Mostrar la normalización.** Explicar `F₁ ← ½ F₁`: el pivote se convierte en 1.
6. **Mostrar una eliminación.** Explicar `F₂ ← F₂ − F₁`: se anula una entrada.
7. **Bajar hasta la forma reducida.** Señalar la matriz final con la diagonal de unos.
8. **Cambiar de idioma.** Pulsar **EN** en la cabecera y mostrar que toda la interfaz cambia al inglés.
9. **Cambiar de tema.** Pulsar el botón de sol/luna y mostrar el modo claro.
10. **Cambiar a 5×5.** Pulsar el tamaño 5×5 y mostrar que el ejemplo se carga completo; resolver si hay tiempo.
11. **Mostrar un caso sin solución.** Cambiar a 2×2, escribir:
    - Fila 1: `1 1 1`
    - Fila 2: `2 2 3`
    Resolver y mostrar el mensaje **Sin solución** y la fila `0 = c`.
12. **Mostrar un caso con infinitas soluciones.** Escribir:
    - Fila 1: `1 1 2`
    - Fila 2: `2 2 4`
    Resolver y mostrar **Infinitas soluciones**.
13. **Responsive.** Si el tiempo lo permite, reducir la ventana o mostrar el modo móvil del navegador.
14. **Copiar solución.** Pulsar **Copiar solución** y mostrar el aviso.

**Consejo:** no expliques cada paso; elige 3 o 4 y deja que la interfaz hable.

---

## 6. Bloque 4 · El algoritmo por dentro

**Duración:** 3 minutos.
**Responsables:** Gabriel y Carlos.

**Qué decir:**

> El corazón del proyecto está en `solver/gauss_jordan.py`. Trabajamos con fracciones exactas usando `fractions.Fraction`, así que no hay errores de redondeo.
>
> El algoritmo hace esto:
> 1. Busca el pivote de mayor valor absoluto en la columna actual.
> 2. Si el pivote es cero, pasa a la siguiente columna y esa variable queda libre.
> 3. Intercambia filas si hace falta.
> 4. Divide la fila pivote para que el pivote sea 1.
> 5. Elimina esa columna en **todas** las demás filas, no solo en las de abajo.
> 6. Guarda una copia de la matriz después de cada operación.
>
> Al final calcula el rango y clasifica:
> - rango igual al número de incógnitas → solución única,
> - rango menor → infinitas soluciones,
> - fila del tipo `0 = c` con `c ≠ 0` → sin solución.

**Qué mostrar:**

- `solver/gauss_jordan.py` en GitHub, señalando `solve_system`, `_record_step` y `parse_cell`.
- Un paso de la línea de tiempo en la web para conectar el código con la interfaz.

**Pregunta puente para Carlos:**

> El backend expone un endpoint `POST /api/solve/` que recibe el tamaño y la matriz, valida cada celda y devuelve el resultado en JSON. La página nunca calcula nada: todo lo resuelve Python en el servidor.

---

## 7. Bloque 5 · Arquitectura, pruebas y despliegue

**Duración:** 2 minutos.
**Responsable:** Samuel.

**Qué decir:**

> La arquitectura es sencilla: el navegador muestra la interfaz, JavaScript envía la matriz al endpoint, Django resuelve con Python y devuelve los pasos, y el frontend los dibuja.
>
> El proyecto no usa base de datos porque es stateless: no hay usuarios ni historial que guardar. Eso simplifica el despliegue.
>
> Las pruebas están en `solver/tests.py` y cubren los cuatro tamaños, sistemas sin solución, sistemas con infinitas soluciones, entradas fraccionarias y decimales, y los endpoints. Son 21 pruebas y GitHub Actions las ejecuta en cada push.
>
> En producción usamos Gunicorn y WhiteNoise para los archivos estáticos. Render lee `render.yaml`, ejecuta `build.sh` y publica la aplicación con HTTPS.

**Qué mostrar:**

- La pestaña **Actions** del repositorio con la última ejecución en verde.
- El archivo `render.yaml`.
- La URL en vivo.

---

## 8. Bloque 6 · Cierre

**Duración:** 2 minutos.
**Responsable:** todo el equipo.

**Qué decir:**

> En resumen: construimos una herramienta que no solo resuelve sistemas, sino que enseña el método paso a paso. Usa fracciones exactas, clasifica los sistemas, funciona en español e inglés, tiene modo claro y oscuro, y está desplegada en Render.
>
> El código está en GitHub y es libre para que otros estudiantes lo usen o lo extiendan.

**Cierre sugerido:** mostrar la URL y el código QR del repositorio.

---

## 9. Preguntas probables y respuestas

### ¿Qué es la forma escalonada reducida?

Es una matriz donde cada pivote vale 1, es el único elemento distinto de cero en su columna y los pivotes avanzan de izquierda a derecha. En un sistema cuadrado con solución única, la parte de coeficientes queda como la matriz identidad.

### ¿Por qué usan fracciones y no decimales?

Porque las fracciones son exactas. Con decimales, operaciones como `1/3` se redondean y el resultado puede dejar de ser correcto. `Fraction` mantiene la precisión durante todo el procedimiento.

### ¿Qué pasa si el pivote es cero?

Se busca otra fila de la misma columna con pivote distinto de cero y se intercambian. Si toda la columna es cero, se avanza a la siguiente columna y esa variable queda libre. Eso puede llevar a infinitas soluciones.

### ¿Por qué eligen el pivote de mayor valor absoluto?

Es la estrategia de **pivoteo parcial**. Mejora la estabilidad numérica y evita divisiones problemáticas. Con fracciones no hay redondeo, pero mantiene el algoritmo robusto y ordenado.

### ¿Cómo detectan que un sistema no tiene solución?

Si en la forma reducida aparece una fila donde todos los coeficientes son cero pero el término independiente no lo es, se tiene `0 = c` con `c ≠ 0`. Esa contradicción significa que el sistema es incompatible.

### ¿Cómo detectan infinitas soluciones?

Si el rango de la matriz de coeficientes es menor que el número de incógnitas y el sistema es consistente, hay al menos una variable libre, así que hay infinitas soluciones.

### ¿Por qué Django y no solo HTML y JavaScript?

Porque el cálculo se hace en Python con precisión exacta y el backend queda separado del frontend. Además, Django aporta validación, seguridad CSRF, configuración de producción y una estructura ordenada para trabajar en grupo.

### ¿Por qué no usaron GitHub Pages?

GitHub Pages solo sirve archivos estáticos y no puede ejecutar Python ni Django. Por eso el backend está en Render. GitHub Pages podría alojar una página informativa, pero no el resolutor completo.

### ¿Cómo se comunican frontend y backend?

El frontend hace `fetch` a `POST /api/solve/` con un JSON que incluye `size` y `matrix`. El backend responde con `initial`, `steps`, `final`, `classification`, `solution` y `rank`.

### ¿Cómo renderizan las fracciones sin LaTeX?

El backend devuelve cadenas como `-3/4`. El frontend las convierte en HTML con dos `span`, uno para el numerador y otro para el denominador, y CSS dibuja la línea divisoria. Es más liviano que cargar una librería matemática.

### ¿Cómo funciona el cambio de idioma?

Todos los textos están en un diccionario en `static/js/app.js` con claves para español e inglés. Al pulsar **ES** o **EN**, se actualizan los elementos con `data-i18n`, se guarda la preferencia en `localStorage` y se vuelven a dibujar los resultados en el idioma elegido.

### ¿La aplicación guarda los datos del usuario?

No. No hay base de datos ni sesiones. Cada cálculo es independiente y no se almacena nada en el servidor.

### ¿Qué pasa con matrices más grandes?

El algoritmo funciona para cualquier tamaño, pero la interfaz está limitada a 5×5 por claridad visual y porque es el alcance del trabajo. Extenderlo requiere agregar el botón del nuevo tamaño y ajustar el límite `MAX_SIZE`.

### ¿Cómo se dividió el trabajo?

Gabriel, Carlos y Samuel trabajaron el backend; Carlos Fajardo y Jiostin, el frontend. El detalle de archivos, responsabilidades y ramas está en `docs/EQUIPO.md`.

### ¿Qué aprendieron?

A separar responsabilidades entre backend y frontend, a trabajar con ramas y pull requests, a escribir pruebas automatizadas y a desplegar una aplicación Django en un servicio gratuito.

---

## 10. Plan de respaldo

Si Render está dormido o falla el internet:

```bash
cd pagina_matrices
source .venv/bin/activate
python manage.py runserver
```

Abrir <http://127.0.0.1:8000> y hacer la demo local. La aplicación funciona igual.

Si falla el proyector, tener capturas de pantalla de:

- la página principal,
- una línea de tiempo completa,
- un caso sin solución,
- un caso con infinitas soluciones.

---

## 11. Consejos de presentación

- Reparte las intervenciones: que hable cada integrante al menos una vez.
- No leas el código línea por línea; explica la idea y muestra las funciones clave.
- Usa el ejemplo de 3×3 como hilo conductor.
- Si alguien pregunta algo que no saben, respondan con honestidad y ofrezcan investigarlo.
- Practiquen una vez completa con cronómetro.
- Lleguen con la página ya abierta.

---

## 12. Anexo · Comandos útiles

```bash
# Ejecutar pruebas
python manage.py check
python manage.py test -v 2

# Levantar el servidor local
python manage.py runserver

# Ver el estado del repositorio
git status
git log --oneline --graph --all

# Crear una rama para un cambio
git checkout -b docs/mi-aporte
```
