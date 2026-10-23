# Guía de contribución

Esta guía explica cómo trabajar en grupo sobre el repositorio **pagina_matrices** sin pisarse los cambios y dejando evidencia clara de la participación de cada integrante.

---

## 1. Preparar el entorno

Requisitos: Python 3.12 o superior y Git.

```bash
git clone https://github.com/calejandrofajardoodst/pagina_matrices.git
cd pagina_matrices

python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

python manage.py check
python manage.py test
python manage.py runserver
```

> En Ubuntu, si `python3 -m venv` falla, instala `python3-venv` o usa `python3 -m venv --without-pip .venv` y luego instala `pip` con `get-pip.py`.

---

## 2. Reglas de ramas

- `main` siempre debe estar estable y con las pruebas en verde.
- Nadie hace push directo a `main`.
- Cada cambio va en una rama con un nombre descriptivo.

Formato sugerido:

```text
tipo/area-descripcion
```

Ejemplos:

```text
feat/api-validaciones
fix/pivote-cero
docs/guia-exposicion
test/casos-5x5
style/tema-claro
chore/actualizar-dependencias
```

Nombres sugeridos por rol en [docs/EQUIPO.md](docs/EQUIPO.md).

---

## 3. Flujo de trabajo

```bash
# 1. Actualizar main
git checkout main
git pull origin main

# 2. Crear la rama
git checkout -b feat/mi-cambio

# 3. Trabajar y probar
python manage.py test

# 4. Registrar el cambio
git add .
git commit -m "feat: descripción corta en imperativo"

# 5. Subir la rama
git push -u origin feat/mi-cambio

# 6. Abrir el pull request
gh pr create --base main --head feat/mi-cambio --fill
```

Si no tienes `gh` instalado, abre el enlace que aparece después del `push` en la terminal.

---

## 4. Convención de commits

Usa mensajes cortos en imperativo y con prefijo:

| Prefijo | Uso |
| --- | --- |
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de un error |
| `docs:` | Documentación |
| `test:` | Pruebas |
| `style:` | Cambios visuales o de formato |
| `refactor:` | Reorganización sin cambiar comportamiento |
| `chore:` | Tareas de mantenimiento |

Ejemplos:

```text
feat: permitir entradas decimales con coma
fix: evitar división por cero al elegir pivote
docs: explicar la clasificación de sistemas
test: agregar caso 5x5 con intercambio de filas
```

---

## 5. Pull requests

- Un pull request por cambio significativo.
- Usa la plantilla que aparece automáticamente en `.github/pull_request_template.md`.
- El PR debe explicar qué cambió, por qué y cómo probarlo.
- Otro integrante debe revisarlo y aprobarlo.
- No se hace merge si las pruebas fallan.
- Al fusionar, se recomienda `Squash and merge` para mantener el historial limpio.

---

## 6. Pruebas obligatorias antes de subir

```bash
python manage.py check
python manage.py test -v 2
```

El workflow de GitHub Actions ejecuta lo mismo en cada push y pull request.

---

## 7. Qué no se debe subir

El archivo `.gitignore` ya excluye lo siguiente, pero revísalo antes de hacer `git add .`:

- `.venv/`
- `__pycache__/`
- `staticfiles/`
- `db.sqlite3`
- `.env`
- Archivos con contraseñas, tokens o claves.

Si accidentalmente subes un secreto, avisa al equipo y genera una clave nueva.

---

## 8. Estilo de código

- Python: sigue PEP 8, usa nombres descriptivos y tipos cuando aporten claridad.
- JavaScript: mantén las funciones pequeñas y los comentarios en español.
- CSS: usa las variables definidas en `:root` en lugar de colores sueltos.
- HTML: conserva la estructura semántica y los atributos de accesibilidad.
- Documentación: escribe en español, con ejemplos ejecutables.

---

## 9. Roles y revisión

Antes de abrir un PR, identifica tu rol en [docs/EQUIPO.md](docs/EQUIPO.md) y pide la revisión de alguien del área complementaria:

- Backend revisa backend.
- Frontend revisa frontend.
- Los cambios de despliegue los revisa el responsable de despliegue.

---

## 10. Preguntas frecuentes

**¿Puedo trabajar en dos ramas a la vez?**
Sí, con `git worktree` o cambiando de rama. Guarda o confirma tus cambios antes de cambiar.

**¿Qué hago si mi rama quedó atrás de `main`?**
Actualiza `main`, vuelve a tu rama y haz `git rebase main` o `git merge main`.

**¿Puedo modificar los textos en inglés y español?**
Sí, pero hazlo en el mismo PR para que las dos versiones queden sincronizadas en `static/js/app.js`.

**¿Dónde reporto un error?**
Abre un issue en GitHub con pasos para reproducirlo, resultado esperado y resultado obtenido.
