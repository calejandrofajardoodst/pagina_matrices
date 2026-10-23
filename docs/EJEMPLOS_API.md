# Ejemplos de la API

Colección de ejemplos para probar el endpoint `POST /api/solve/` y entender la forma de las respuestas.

> Desde `curl` o Postman, el endpoint exige el token CSRF de Django. La forma más sencilla de probarlo es desde la interfaz web, con el cliente de pruebas de Django o con la pestaña Network del navegador. El archivo `docs/api.http` sirve como referencia para VS Code REST Client.

---

## 1. Sistema con solución única (2×2)

### Petición

```json
{
  "size": 2,
  "matrix": [
    ["2", "1", "5"],
    ["1", "-1", "1"]
  ]
}
```

### Respuesta (fragmento)

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
    },
    {
      "kind": "eliminate",
      "target": 1,
      "source": 0,
      "factor": "1",
      "pivot": [0, 0],
      "matrix": [["1", "1/2", "5/2"], ["0", "-3/2", "-3/2"]]
    }
  ],
  "final": [["1", "0", "2"], ["0", "1", "1"]],
  "classification": "unique",
  "solution": ["2", "1"],
  "rank": 2
}
```

**Lectura:** el sistema tiene solución única `x₁ = 2`, `x₂ = 1`.

---

## 2. Sistema con infinitas soluciones (2×2)

### Petición

```json
{
  "size": 2,
  "matrix": [
    ["1", "1", "2"],
    ["2", "2", "4"]
  ]
}
```

### Respuesta (fragmento)

```json
{
  "ok": true,
  "classification": "infinite",
  "solution": null,
  "rank": 1,
  "final": [["1", "1", "2"], ["0", "0", "0"]]
}
```

**Lectura:** la segunda ecuación es el doble de la primera. Hay una variable libre y, por lo tanto, infinitas soluciones.

---

## 3. Sistema sin solución (2×2)

### Petición

```json
{
  "size": 2,
  "matrix": [
    ["1", "1", "1"],
    ["2", "2", "3"]
  ]
}
```

### Respuesta (fragmento)

```json
{
  "ok": true,
  "classification": "none",
  "solution": null,
  "rank": 1,
  "final": [["1", "1", "1"], ["0", "0", "-1/2"]]
}
```

**Lectura:** la última fila representa `0 = -1/2`, una contradicción. El sistema es incompatible.

---

## 4. Intercambio de filas (3×3)

Cuando el pivote de la columna es cero, el algoritmo busca otra fila.

### Petición

```json
{
  "size": 3,
  "matrix": [
    ["0", "1", "0", "2"],
    ["1", "0", "0", "1"],
    ["0", "0", "1", "3"]
  ]
}
```

### Primer paso de la respuesta

```json
{
  "kind": "swap",
  "target": 0,
  "source": 1,
  "factor": null,
  "pivot": [0, 0],
  "matrix": [
    ["1", "0", "0", "1"],
    ["0", "1", "0", "2"],
    ["0", "0", "1", "3"]
  ]
}
```

**Lectura:** se intercambiaron `F₁` y `F₂` para colocar un pivote distinto de cero.

---

## 5. Entradas con fracciones y decimales

### Petición

```json
{
  "size": 2,
  "matrix": [
    ["1/2", "0,5", "2"],
    ["1", "-1", "0"]
  ]
}
```

### Respuesta (fragmento)

```json
{
  "ok": true,
  "classification": "unique",
  "solution": ["2", "2"]
}
```

**Lectura:** `0,5` se interpreta como `1/2` y todos los resultados se devuelven como fracciones exactas.

---

## 6. Errores de validación

### Celda vacía

```json
{
  "ok": false,
  "error": "missing_cell",
  "row": 0,
  "col": 1
}
```

### Número inválido

```json
{
  "ok": false,
  "error": "invalid_number",
  "row": 1,
  "col": 0
}
```

### Tamaño fuera de rango

```json
{
  "ok": false,
  "error": "invalid_size"
}
```

### JSON inválido

```json
{
  "ok": false,
  "error": "invalid_json"
}
```

---

## 7. Códigos de error

| HTTP | `error` | Significado |
| --- | --- | --- |
| 400 | `missing_cell` | Falta un valor |
| 400 | `invalid_number` | El valor no es un número válido |
| 400 | `invalid_size` | El tamaño no es 2, 3, 4 o 5 |
| 400 | `invalid_matrix` | La forma de la matriz no coincide |
| 400 | `invalid_json` | El cuerpo no es JSON |
| 413 | `payload_too_large` | El cuerpo supera 32 KB |
| 500 | `server_error` | Error inesperado del servidor |

---

## 8. Probar con el cliente de Django

```python
import json
from django.test import Client

client = Client()
response = client.post(
    "/api/solve/",
    data=json.dumps({
        "size": 2,
        "matrix": [["2", "1", "5"], ["1", "-1", "1"]],
    }),
    content_type="application/json",
)
print(response.json())
```

---

## 9. Probar desde la consola del navegador

Con la página abierta, en la consola de desarrollador:

```js
const token = document.querySelector('[name="csrfmiddlewaretoken"]').value;

fetch("/api/solve/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": token,
  },
  body: JSON.stringify({
    size: 2,
    matrix: [["2", "1", "5"], ["1", "-1", "1"]],
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```
