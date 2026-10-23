# Checklist de entrega

Lista de verificación para dar por terminado el proyecto antes de la entrega o la exposición. Marca cada punto y anota el responsable.

---

## 1. Repositorio y código

- [ ] El repositorio está en <https://github.com/calejandrofajardoodst/pagina_matrices>.
- [ ] La rama `main` tiene la última versión y el árbol de trabajo está limpio.
- [ ] Los nombres reales de los integrantes reemplazaron los corchetes en `README.md` y `docs/EQUIPO.md`.
- [ ] No hay secretos, `.venv/` ni `staticfiles/` versionados.
- [ ] El README explica qué es el proyecto, cómo ejecutarlo y cómo desplegarlo.

## 2. Pruebas y calidad

- [ ] `python manage.py check` no reporta errores.
- [ ] `python manage.py test` pasa las 21 pruebas.
- [ ] El workflow de GitHub Actions está en verde en la última ejecución.
- [ ] Se probaron manualmente los tamaños 2×2, 3×3, 4×4 y 5×5.
- [ ] Se probaron los tres resultados: solución única, infinitas soluciones y sin solución.
- [ ] Se probaron entradas con enteros, decimales y fracciones.
- [ ] Se probó el cambio de idioma ES/EN.
- [ ] Se probó el cambio de tema claro/oscuro.
- [ ] Se probó en una ventana de móvil o tableta.

## 3. Aplicación desplegada

- [ ] La aplicación responde en <https://pagina-matrices.onrender.com>.
- [ ] El health check responde en <https://pagina-matrices.onrender.com/health/>.
- [ ] Los estilos y el JavaScript cargan correctamente.
- [ ] El botón **Resolver sistema** responde en la versión en vivo.
- [ ] Se abrió la página unos minutos antes de la exposición.

## 4. Documentación

- [ ] [README.md](../README.md) actualizado con la demo y los enlaces.
- [ ] [docs/DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md) revisado.
- [ ] [docs/GUIA_EXPOSICION.md](GUIA_EXPOSICION.md) leído por todo el equipo.
- [ ] [docs/EQUIPO.md](EQUIPO.md) con nombres reales.
- [ ] [CONTRIBUTING.md](../CONTRIBUTING.md) disponible para el grupo.
- [ ] Cada integrante puede explicar los archivos de su rol.

## 5. Evidencia de participación

- [ ] Cada integrante tiene al menos una rama o un pull request.
- [ ] Los pull requests tienen descripción, revisión y merge.
- [ ] El historial de `main` muestra los cambios integrados.
- [ ] Las capturas o videos de la demo están guardados.

| Integrante | Rama | PR | Revisado por |
| --- | --- | --- | --- |
| [Nombre 1] | `backend/algoritmo` | # | |
| [Nombre 2] | `backend/api` | # | |
| [Nombre 3] | `backend/deploy` | # | |
| [Nombre 4] | `frontend/diseno` | # | |
| [Nombre 5] | `frontend/interaccion` | # | |

## 6. Exposición

- [ ] El guion de `docs/GUIA_EXPOSICION.md` está repartido.
- [ ] Se hizo un ensayo completo con cronómetro.
- [ ] Hay un plan de respaldo si falla internet (servidor local).
- [ ] Hay capturas de pantalla de respaldo.
- [ ] Todos los integrantes saben qué parte les toca.

## 7. Entrega académica

- [ ] Se entregó el enlace del repositorio.
- [ ] Se entregó la URL de la aplicación.
- [ ] Se entregó esta documentación o el informe correspondiente.
- [ ] Se revisó la rúbrica del curso y se cubrieron todos los criterios.

---

## Comandos rápidos de verificación

```bash
cd pagina_matrices
source .venv/bin/activate

python manage.py check
python manage.py test -v 2

git status
git log --oneline --graph --all
```

```bash
curl -s https://pagina-matrices.onrender.com/health/
# {"status": "ok"}
```
