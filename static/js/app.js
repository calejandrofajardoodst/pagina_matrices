(() => {
  "use strict";

  /* =======================================================
     Translations
     ======================================================= */

  const translations = {
    es: {
      "meta.title": "Gauss–Jordan | Resuelve matrices paso a paso",
      "meta.description":
        "Resuelve sistemas de ecuaciones de 2×2 a 5×5 con el método de Gauss–Jordan. Observa cada operación entre filas y obtén fracciones exactas.",

      "a11y.skip": "Saltar al resolutor",
      "brand.tag": "Laboratorio de matrices",
      "nav.label": "Principal",
      "nav.solver": "Resolver",
      "nav.method": "Método",
      "nav.how": "Cómo funciona",
      "lang.label": "Idioma",
      "theme.toLight": "Activar modo claro",
      "theme.toDark": "Activar modo oscuro",

      "hero.eyebrow": "Álgebra lineal · paso a paso",
      "hero.title1": "Resuelve sistemas",
      "hero.title2": "por Gauss–Jordan.",
      "hero.lede":
        "Ingresa tu matriz aumentada y observa cada operación entre filas hasta llegar a la forma escalonada reducida. Resultados exactos, sin decimales aproximados.",
      "hero.badge1": "2×2 a 5×5",
      "hero.badge2": "Fracciones exactas",
      "hero.badge3": "Cada paso visible",
      "hero.cta": "Empezar a resolver",
      "hero.visual.augmented": "Matriz aumentada",
      "hero.visual.pivots": "3 pivotes · solución única",
      "hero.visual.tag": "Paso a paso",

      "solver.kicker": "Paso 1",
      "solver.title": "Configura tu sistema",
      "solver.size": "Tamaño de la matriz",
      "solver.matrix": "Matriz aumentada",
      "solver.hint":
        "Acepta enteros, decimales y fracciones como -3/4. La última columna son los términos independientes.",
      "solver.solve": "Resolver sistema",
      "solver.loading": "Resolviendo…",
      "solver.example": "Ejemplo",
      "solver.clear": "Limpiar",

      "guide.title": "Antes de empezar",
      "guide.item1":
        "Cada fila representa una ecuación; la última columna guarda el término independiente.",
      "guide.item2": "Elige un pivote distinto de cero y conviértelo en 1.",
      "guide.item3": "Anula el resto de la columna con operaciones entre filas.",

      "legend.title": "Notación",
      "legend.swap": "Intercambio",
      "legend.scale": "Escalamiento",
      "legend.eliminate": "Eliminación",
      "legend.note": "Las operaciones elementales conservan el conjunto solución.",

      "matrix.augmentedAria": "Matriz aumentada",
      "matrix.cellAria": "Fila {row}, columna {col}",
      "matrix.bAria": "Fila {row}, término independiente",
      "rowSymbol": "F",

      "results.kicker": "Resultado",
      "results.unique": "Solución única",
      "results.infinite": "Infinitas soluciones",
      "results.none": "Sin solución",
      "results.uniqueSub": "El sistema es compatible determinado.",
      "results.infiniteSub": "El sistema es compatible indeterminado.",
      "results.noneSub": "El sistema es incompatible.",
      "results.solution": "Solución",
      "results.noUnique": "Este sistema no tiene una solución única.",
      "results.noSolution": "El sistema no tiene solución.",
      "results.manySolutions":
        "Hay infinitas soluciones; no existe un único valor para cada incógnita.",
      "results.steps": "Transformaciones",
      "results.initial": "Matriz aumentada inicial",
      "results.final": "Forma escalonada reducida",
      "results.initialDesc": "Punto de partida: cada fila representa una ecuación del sistema.",
      "results.finalDesc":
        "Los pivotes valen 1 y el resto de sus columnas es 0. La solución se lee en la última columna.",
      "results.finalDescInfinite":
        "Hay columnas sin pivote: sus variables son libres. Por eso el sistema tiene infinitas soluciones.",
      "results.finalDescNone":
        "Aparece una fila de la forma 0 = c con c ≠ 0. Esa contradicción indica que el sistema no tiene solución.",
      "results.copy": "Copiar solución",
      "results.copied": "Solución copiada",
      "results.new": "Nuevo cálculo",
      "results.operations": "{count} operaciones",
      "results.operationOne": "1 operación",
      "results.noteUnique":
        "Rango(A) = {rank}. Cada incógnita queda determinada por una columna pivote.",
      "results.noteInfinite":
        "Rango(A) = {rank}, menor que el número de incógnitas ({count}). Hay variables libres, así que el sistema tiene infinitas soluciones.",
      "results.noteNone":
        "Rango(A) = {rank}. Aparece una fila de la forma 0 = c con c ≠ 0, por lo que el sistema es incompatible.",

      "step.swap": "Intercambio de filas",
      "step.scale": "Normalización del pivote",
      "step.eliminate": "Eliminación",
      "step.swapDesc": "Intercambiamos las filas para colocar un pivote distinto de cero.",
      "step.scaleDesc": "Dividimos la fila entre el pivote para convertirlo en 1.",
      "step.eliminateDesc":
        "Restamos el múltiplo necesario de la fila pivote para anular esta entrada.",
      "step.label": "Paso {n}",

      "method.kicker": "El método",
      "method.title": "Sin misterio: solo filas.",
      "method.lede":
        "Gauss–Jordan transforma la matriz aumentada en una forma donde la solución se lee directamente. Cada transformación es una operación elemental que no altera el sistema.",
      "method.card1Title": "Matriz aumentada",
      "method.card1Text":
        "Cada ecuación aporta una fila. Los coeficientes forman A y la última columna guarda b.",
      "method.card2Title": "Operaciones elementales",
      "method.card2Text":
        "Intercambiar filas, multiplicar una fila por un escalar y sumar un múltiplo de otra fila.",
      "method.card3Title": "Forma reducida",
      "method.card3Text":
        "Cuando cada pivote es 1 y el resto de su columna es 0, la solución aparece en la última columna.",

      "footer.note": "Proyecto académico de álgebra lineal.",
      "footer.github": "Código en GitHub",
      "footer.made": "Hecho con Django",

      "error.missing_cell": "Completa esta celda para continuar.",
      "error.invalid_number":
        "Usa un entero, decimal o fracción válida (por ejemplo, -3/4).",
      "error.invalid_size": "El tamaño debe ser 2, 3, 4 o 5.",
      "error.invalid_matrix": "La matriz no tiene el tamaño esperado.",
      "error.invalid_json": "No se pudo leer la solicitud.",
      "error.payload_too_large": "La solicitud es demasiado grande.",
      "error.server_error": "Ocurrió un error al resolver. Intenta de nuevo.",
      "error.network": "No se pudo conectar con el servidor.",
      "error.generic": "Revisa los datos e intenta de nuevo.",

      "toast.example": "Ejemplo cargado y resuelto",
      "toast.cleared": "Matriz limpia",
      "toast.copied": "Solución copiada",
    },

    en: {
      "meta.title": "Gauss–Jordan | Solve matrices step by step",
      "meta.description":
        "Solve 2×2 to 5×5 linear systems with Gauss–Jordan elimination. See every row operation and get exact fractions.",

      "a11y.skip": "Skip to the solver",
      "brand.tag": "Matrix laboratory",
      "nav.label": "Main",
      "nav.solver": "Solve",
      "nav.method": "Method",
      "nav.how": "How it works",
      "lang.label": "Language",
      "theme.toLight": "Switch to light mode",
      "theme.toDark": "Switch to dark mode",

      "hero.eyebrow": "Linear algebra · step by step",
      "hero.title1": "Solve linear systems",
      "hero.title2": "with Gauss–Jordan.",
      "hero.lede":
        "Enter your augmented matrix and follow every row operation until the reduced row echelon form. Exact results, no rounded decimals.",
      "hero.badge1": "2×2 to 5×5",
      "hero.badge2": "Exact fractions",
      "hero.badge3": "Every step visible",
      "hero.cta": "Start solving",
      "hero.visual.augmented": "Augmented matrix",
      "hero.visual.pivots": "3 pivots · unique solution",
      "hero.visual.tag": "Step by step",

      "solver.kicker": "Step 1",
      "solver.title": "Set up your system",
      "solver.size": "Matrix size",
      "solver.matrix": "Augmented matrix",
      "solver.hint":
        "Accepts integers, decimals and fractions such as -3/4. The last column holds the constants.",
      "solver.solve": "Solve system",
      "solver.loading": "Solving…",
      "solver.example": "Example",
      "solver.clear": "Clear",

      "guide.title": "Before you start",
      "guide.item1":
        "Each row is one equation; the last column stores the constant term.",
      "guide.item2": "Pick a nonzero pivot and turn it into 1.",
      "guide.item3": "Clear the rest of the column with row operations.",

      "legend.title": "Notation",
      "legend.swap": "Swap",
      "legend.scale": "Scaling",
      "legend.eliminate": "Elimination",
      "legend.note": "Elementary row operations preserve the solution set.",

      "matrix.augmentedAria": "Augmented matrix",
      "matrix.cellAria": "Row {row}, column {col}",
      "matrix.bAria": "Row {row}, constant term",
      "rowSymbol": "R",

      "results.kicker": "Result",
      "results.unique": "Unique solution",
      "results.infinite": "Infinitely many solutions",
      "results.none": "No solution",
      "results.uniqueSub": "The system is consistent and independent.",
      "results.infiniteSub": "The system is consistent and dependent.",
      "results.noneSub": "The system is inconsistent.",
      "results.solution": "Solution",
      "results.noUnique": "This system does not have a unique solution.",
      "results.noSolution": "The system has no solution.",
      "results.manySolutions":
        "There are infinitely many solutions; no single value exists for each unknown.",
      "results.steps": "Transformations",
      "results.initial": "Initial augmented matrix",
      "results.final": "Reduced row echelon form",
      "results.initialDesc": "Starting point: each row represents one equation of the system.",
      "results.finalDesc":
        "Every pivot is 1 and the rest of its column is 0. The solution is read from the last column.",
      "results.finalDescInfinite":
        "Some columns have no pivot: their variables are free. That is why the system has infinitely many solutions.",
      "results.finalDescNone":
        "A row of the form 0 = c with c ≠ 0 appears. That contradiction means the system has no solution.",
      "results.copy": "Copy solution",
      "results.copied": "Solution copied",
      "results.new": "New calculation",
      "results.operations": "{count} operations",
      "results.operationOne": "1 operation",
      "results.noteUnique":
        "Rank(A) = {rank}. Every variable is determined by a pivot column.",
      "results.noteInfinite":
        "Rank(A) = {rank}, less than the number of unknowns ({count}). Free variables exist, so the system has infinitely many solutions.",
      "results.noteNone":
        "Rank(A) = {rank}. A row of the form 0 = c with c ≠ 0 appears, so the system is inconsistent.",

      "step.swap": "Row swap",
      "step.scale": "Pivot normalisation",
      "step.eliminate": "Elimination",
      "step.swapDesc": "We swap the rows to place a nonzero pivot in position.",
      "step.scaleDesc": "We divide the row by the pivot to turn it into 1.",
      "step.eliminateDesc":
        "We subtract the required multiple of the pivot row to clear this entry.",
      "step.label": "Step {n}",

      "method.kicker": "The method",
      "method.title": "No mystery: just rows.",
      "method.lede":
        "Gauss–Jordan transforms the augmented matrix into a form where the solution can be read directly. Every transformation is an elementary operation that leaves the system unchanged.",
      "method.card1Title": "Augmented matrix",
      "method.card1Text":
        "Each equation contributes a row. The coefficients form A and the last column holds b.",
      "method.card2Title": "Elementary operations",
      "method.card2Text":
        "Swap rows, multiply a row by a scalar, and add a multiple of another row.",
      "method.card3Title": "Reduced form",
      "method.card3Text":
        "When every pivot is 1 and the rest of its column is 0, the solution appears in the last column.",

      "footer.note": "Academic linear algebra project.",
      "footer.github": "Code on GitHub",
      "footer.made": "Built with Django",

      "error.missing_cell": "Fill in this cell to continue.",
      "error.invalid_number":
        "Use a valid integer, decimal or fraction (for example, -3/4).",
      "error.invalid_size": "The size must be 2, 3, 4 or 5.",
      "error.invalid_matrix": "The matrix does not have the expected size.",
      "error.invalid_json": "The request could not be read.",
      "error.payload_too_large": "The request is too large.",
      "error.server_error": "Something went wrong while solving. Please try again.",
      "error.network": "Could not connect to the server.",
      "error.generic": "Check the values and try again.",

      "toast.example": "Example loaded and solved",
      "toast.cleared": "Matrix cleared",
      "toast.copied": "Solution copied",
    },
  };

  /* =======================================================
     Example systems
     ======================================================= */

  const examples = {
    2: [
      ["2", "1", "5"],
      ["1", "-1", "1"],
    ],
    3: [
      ["1", "1", "1", "6"],
      ["2", "-1", "1", "3"],
      ["1", "2", "-1", "2"],
    ],
    4: [
      ["0", "1", "0", "0", "2"],
      ["2", "0", "0", "0", "2"],
      ["0", "0", "1", "1", "7"],
      ["0", "0", "0", "1", "4"],
    ],
    5: [
      ["0", "1", "0", "0", "0", "2"],
      ["2", "0", "0", "0", "0", "2"],
      ["0", "0", "1", "1", "0", "7"],
      ["0", "0", "0", "1", "1", "9"],
      ["0", "0", "0", "0", "1", "5"],
    ],
  };

  const ERROR_KEYS = {
    missing_cell: "error.missing_cell",
    invalid_number: "error.invalid_number",
    invalid_size: "error.invalid_size",
    invalid_matrix: "error.invalid_matrix",
    invalid_json: "error.invalid_json",
    payload_too_large: "error.payload_too_large",
    server_error: "error.server_error",
  };

  const MAX_SIZE = 5;

  /* =======================================================
     State & helpers
     ======================================================= */

  const state = {
    size: 3,
    lang: "es",
    theme: "dark",
    valuesBySize: {},
    values: null,
    result: null,
    lastError: null,
    toastTimer: 0,
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function emptyValues() {
    return Array.from({ length: MAX_SIZE }, () =>
      Array.from({ length: MAX_SIZE + 1 }, () => "")
    );
  }

  function valuesFromExample(size) {
    const values = emptyValues();
    examples[size].forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        values[rowIndex][colIndex] = value;
      });
    });
    return values;
  }

  function t(key, variables) {
    const dictionary = translations[state.lang] || translations.es;
    let text = dictionary[key];
    if (text === undefined) {
      text = translations.es[key];
    }
    if (text === undefined) {
      return key;
    }
    if (!variables) {
      return text;
    }
    return Object.keys(variables).reduce(
      (result, name) => result.split(`{${name}}`).join(String(variables[name])),
      text
    );
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return entities[character];
    });
  }

  function safeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      /* Storage can be unavailable in private browsing. */
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scrollToElement(element) {
    if (!element) {
      return;
    }
    element.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  function focusFirstInput() {
    const firstInput = $("#matrix-editor input");
    if (firstInput) {
      firstInput.focus();
      firstInput.select();
    }
  }

  function operationsLabel(count) {
    return t(count === 1 ? "results.operationOne" : "results.operations", {
      count,
    });
  }

  /* =======================================================
     Theme & language
     ======================================================= */

  function updateThemeLabel() {
    const button = $("#theme-toggle");
    if (!button) {
      return;
    }
    const key = state.theme === "dark" ? "theme.toLight" : "theme.toDark";
    button.setAttribute("aria-label", t(key));
    button.setAttribute("title", t(key));
  }

  function setTheme(theme, persist = true) {
    state.theme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = state.theme;
    if (persist) {
      safeStorage("gj-theme", state.theme);
    }
    updateThemeLabel();
    const metaTheme = $('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", state.theme === "dark" ? "#070707" : "#f7f2e6");
    }
  }

  function applyTranslations() {
    $$("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    $$("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
    });
    $$("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
    });

    document.documentElement.lang = state.lang;
    document.title = t("meta.title");
    const metaDescription = $('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("meta.description"));
    }

    $$(".lang-btn").forEach((button) => {
      const active = button.dataset.lang === state.lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    updateThemeLabel();

    if (state.lastError && !$("#form-error").hidden) {
      $("#form-error-text").textContent = t(state.lastError.key);
    }

    const solveButton = $("#solve-btn");
    if (solveButton && solveButton.classList.contains("is-loading")) {
      solveButton.querySelector(".btn-label").textContent = t("solver.loading");
    }
  }

  function setLanguage(language, persist = true) {
    if (!translations[language] || state.lang === language) {
      return;
    }
    const activeElement = document.activeElement;
    let activeCell = null;
    if (
      activeElement &&
      activeElement.matches &&
      activeElement.matches("input[data-row]")
    ) {
      activeCell = [activeElement.dataset.row, activeElement.dataset.col];
    }

    state.lang = language;
    if (persist) {
      safeStorage("gj-lang", state.lang);
    }
    applyTranslations();
    buildMatrixEditor();

    if (activeCell) {
      const restored = $(
        `#matrix-editor input[data-row="${activeCell[0]}"][data-col="${activeCell[1]}"]`
      );
      if (restored) {
        restored.focus();
        restored.select();
      }
    }

    if (state.result && !$("#results").hidden) {
      renderResults(state.result, { scroll: false });
    }
  }

  /* =======================================================
     Matrix editor
     ======================================================= */

  function setSize(size) {
    if (size < 2 || size > MAX_SIZE || size === state.size) {
      return;
    }
    state.size = size;
    state.values = state.valuesBySize[size];
    $$(".size-btn").forEach((button) => {
      const active = Number(button.dataset.size) === state.size;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    buildMatrixEditor();
    hideResults();
    clearError();
  }

  function buildMatrixEditor() {
    const editor = $("#matrix-editor");
    if (!editor) {
      return;
    }
    const size = state.size;
    const rowSymbol = t("rowSymbol");
    const tableLabel = t("matrix.augmentedAria");

    const headers = [];
    for (let col = 0; col < size; col += 1) {
      headers.push(`<th scope="col">x<sub>${col + 1}</sub></th>`);
    }
    headers.push('<th scope="col" class="aug">b</th>');

    const rows = [];
    for (let row = 0; row < size; row += 1) {
      const cells = [];
      for (let col = 0; col <= size; col += 1) {
        const isConstant = col === size;
        const value = state.values[row][col] || "";
        const aria = isConstant
          ? t("matrix.bAria", { row: row + 1 })
          : t("matrix.cellAria", { row: row + 1, col: col + 1 });
        cells.push(
          `<td class="${isConstant ? "aug" : ""}">` +
            `<input type="text" inputmode="text" autocomplete="off" spellcheck="false" ` +
            `data-row="${row}" data-col="${col}" value="${escapeHTML(value)}" ` +
            `aria-label="${escapeHTML(aria)}" aria-required="true">` +
            `</td>`
        );
      }
      rows.push(
        `<tr><th scope="row" class="row-label">${rowSymbol}<sub>${row + 1}</sub></th>` +
          cells.join("") +
          "</tr>"
      );
    }

    editor.innerHTML =
      '<span class="matrix-bracket" aria-hidden="true"></span>' +
      `<table class="matrix-input-table" role="grid" aria-label="${escapeHTML(tableLabel)}">` +
      `<thead><tr><th class="corner" aria-hidden="true"></th>${headers.join("")}</tr></thead>` +
      `<tbody>${rows.join("")}</tbody>` +
      "</table>" +
      '<span class="matrix-bracket right" aria-hidden="true"></span>';
  }

  function readMatrix() {
    return Array.from({ length: state.size }, (_, row) =>
      Array.from({ length: state.size + 1 }, (_, col) =>
        String(state.values[row][col] || "").trim()
      )
    );
  }

  function fillFromExample(size) {
    state.valuesBySize[size] = valuesFromExample(size);
    state.values = state.valuesBySize[size];
    buildMatrixEditor();
  }

  function clearMatrix() {
    state.valuesBySize[state.size] = emptyValues();
    state.values = state.valuesBySize[state.size];
    hideResults();
    clearError();
    buildMatrixEditor();
    showToast("toast.cleared");
    focusFirstInput();
  }

  /* =======================================================
     Errors & loading
     ======================================================= */

  function clearError() {
    const formError = $("#form-error");
    if (formError) {
      formError.hidden = true;
    }
    $$("#matrix-editor input.has-error").forEach((input) => {
      input.classList.remove("has-error");
    });
    state.lastError = null;
  }

  function showError(key, coordinates = {}) {
    state.lastError = { key, ...coordinates };
    const formError = $("#form-error");
    const text = $("#form-error-text");
    if (!formError || !text) {
      return;
    }
    text.textContent = t(key);
    formError.hidden = false;
    $$("#matrix-editor input.has-error").forEach((input) => {
      input.classList.remove("has-error");
    });

    if (Number.isInteger(coordinates.row) && Number.isInteger(coordinates.col)) {
      const input = $(
        `#matrix-editor input[data-row="${coordinates.row}"][data-col="${coordinates.col}"]`
      );
      if (input) {
        input.classList.add("has-error");
        input.focus();
        input.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }

  function setLoading(loading) {
    const button = $("#solve-btn");
    if (!button) {
      return;
    }
    button.disabled = loading;
    button.classList.toggle("is-loading", loading);
    button.setAttribute("aria-busy", String(loading));
    button.querySelector(".btn-label").textContent = loading
      ? t("solver.loading")
      : t("solver.solve");
    const exampleButton = $("#example-btn");
    const clearButton = $("#clear-btn");
    if (exampleButton) {
      exampleButton.disabled = loading;
    }
    if (clearButton) {
      clearButton.disabled = loading;
    }
  }

  /* =======================================================
     Matrix rendering
     ======================================================= */

  function fractionHTML(value) {
    if (value === null || value === undefined || value === "") {
      return "";
    }
    const raw = String(value);
    let sign = "";
    let body = raw;
    if (body.startsWith("-")) {
      sign = "−";
      body = body.slice(1);
    }

    if (body.includes("/")) {
      const [numerator, denominator] = body.split("/");
      return (
        sign +
        '<span class="frac" aria-hidden="true">' +
        `<span class="num">${escapeHTML(numerator)}</span>` +
        `<span class="den">${escapeHTML(denominator)}</span>` +
        "</span>" +
        `<span class="sr-only">${escapeHTML(raw)}</span>`
      );
    }
    return sign + escapeHTML(body);
  }

  function renderMatrix(matrix, options = {}) {
    const size = matrix.length;
    const target = Number.isInteger(options.target) ? options.target : null;
    const source = Number.isInteger(options.source) ? options.source : null;
    const pivot = Array.isArray(options.pivot) ? options.pivot : null;

    const rows = matrix
      .map((row, rowIndex) => {
        let rowClass = "";
        if (target === rowIndex) {
          rowClass = "is-target";
        } else if (source === rowIndex) {
          rowClass = "is-source";
        }
        const cells = row
          .map((value, colIndex) => {
            const classes = [];
            if (colIndex === size - 1) {
              classes.push("aug");
            }
            if (
              pivot &&
              pivot[0] === rowIndex &&
              pivot[1] === colIndex
            ) {
              classes.push("is-pivot");
            }
            return `<td class="${classes.join(" ")}">${fractionHTML(value)}</td>`;
          })
          .join("");
        return `<tr class="${rowClass}">${cells}</tr>`;
      })
      .join("");

    return (
      '<div class="matrix-display-wrap">' +
      '<div class="matrix-render">' +
      '<span class="matrix-bracket" aria-hidden="true"></span>' +
      `<table class="matrix-table" aria-label="${escapeHTML(
        t("matrix.augmentedAria")
      )}"><tbody>${rows}</tbody></table>` +
      '<span class="matrix-bracket right" aria-hidden="true"></span>' +
      "</div>" +
      "</div>"
    );
  }

  function notationHTML(step) {
    const symbol = escapeHTML(t("rowSymbol"));
    const target = step.target + 1;
    const source = step.source + 1;
    const sub = (number) => `<sub>${number}</sub>`;

    if (step.kind === "swap") {
      return `${symbol}${sub(target)} <span class="op-arrow">↔</span> ${symbol}${sub(source)}`;
    }
    if (step.kind === "scale") {
      return (
        `${symbol}${sub(target)} <span class="op-arrow">←</span> ` +
        `${fractionHTML(step.factor)} <span class="op-arrow">·</span> ${symbol}${sub(target)}`
      );
    }

    const factor = String(step.factor || "0");
    const negative = factor.startsWith("-");
    const absolute = negative ? factor.slice(1) : factor;
    const coefficient = absolute === "1" ? "" : `${fractionHTML(absolute)} <span class="op-arrow">·</span> `;
    return (
      `${symbol}${sub(target)} <span class="op-arrow">←</span> ` +
      `${symbol}${sub(target)} <span class="op-arrow">${negative ? "+" : "−"}</span> ` +
      `${coefficient}${symbol}${sub(source)}`
    );
  }

  function notationPlain(step) {
    const symbol = t("rowSymbol");
    const target = step.target + 1;
    const source = step.source + 1;
    if (step.kind === "swap") {
      return `${symbol}${target} <-> ${symbol}${source}`;
    }
    if (step.kind === "scale") {
      return `${symbol}${target} <- ${step.factor} * ${symbol}${target}`;
    }
    return `${symbol}${target} <- ${symbol}${target} - (${step.factor}) * ${symbol}${source}`;
  }

  /* =======================================================
     Results
     ======================================================= */

  function hideResults() {
    const results = $("#results");
    if (results) {
      results.hidden = true;
    }
    state.result = null;
    const steps = $("#steps");
    if (steps) {
      steps.innerHTML = "";
    }
  }

  function renderResults(data, options = {}) {
    state.result = data;
    const results = $("#results");
    if (!results) {
      return;
    }

    const configuration = {
      unique: {
        title: "results.unique",
        subtitle: "results.uniqueSub",
        statusClass: "is-success",
        icon: "#i-check",
        note: "results.noteUnique",
      },
      infinite: {
        title: "results.infinite",
        subtitle: "results.infiniteSub",
        statusClass: "is-warning",
        icon: "#i-infinity",
        note: "results.noteInfinite",
      },
      none: {
        title: "results.none",
        subtitle: "results.noneSub",
        statusClass: "is-danger",
        icon: "#i-alert",
        note: "results.noteNone",
      },
    }[data.classification] || {
      title: "results.none",
      subtitle: "results.noneSub",
      statusClass: "is-danger",
      icon: "#i-alert",
      note: "results.noteNone",
    };

    const title = t(configuration.title);
    $("#result-title").textContent = title;
    $("#result-subtitle").textContent = t(configuration.subtitle);

    const status = $("#result-status");
    status.className = `status-pill ${configuration.statusClass}`;
    const statusIcon = $("use", status);
    if (statusIcon) {
      statusIcon.setAttribute("href", configuration.icon);
    }
    $("#result-status-text").textContent = title;

    const solutionValues = $("#solution-values");
    if (data.classification === "unique" && Array.isArray(data.solution)) {
      solutionValues.innerHTML = data.solution
        .map(
          (value, index) =>
            `<span class="solution-chip">` +
            `<span class="var">x<sub>${index + 1}</sub></span> ` +
            `<span class="equals">=</span> ` +
            `<span>${fractionHTML(value)}</span>` +
            `</span>`
        )
        .join("");
    } else {
      const emptyKey =
        data.classification === "none"
          ? "results.noSolution"
          : "results.manySolutions";
      solutionValues.innerHTML = `<span class="solution-empty">${escapeHTML(
        t(emptyKey)
      )}</span>`;
    }

    const note = $("#result-note");
    note.textContent = t(configuration.note, {
      rank: data.rank,
      count: data.size,
    });

    const initialStep =
      '<li class="step-card is-initial" style="--delay:0s">' +
      '<div class="step-marker" aria-hidden="true">' +
      '<svg class="icon"><use href="#i-matrix"></use></svg>' +
      "</div>" +
      '<div class="step-content">' +
      '<div class="step-head">' +
      `<span class="step-kind">${escapeHTML(t("results.initial"))}</span>` +
      '<span class="step-index">[ A | b ]</span>' +
      "</div>" +
      `<p class="step-desc">${escapeHTML(t("results.initialDesc"))}</p>` +
      renderMatrix(data.initial) +
      "</div>" +
      "</li>";

    const operationSteps = data.steps
      .map((step, index) => {
        const delay = Math.min(index * 45, 360);
        const descriptionKey = `step.${step.kind}Desc`;
        const kindKey = `step.${step.kind}`;
        return (
          `<li class="step-card" style="--delay:${delay}ms">` +
          `<div class="step-marker" aria-hidden="true">${String(index + 1).padStart(
            2,
            "0"
          )}</div>` +
          '<div class="step-content">' +
          '<div class="step-head">' +
          `<span class="step-kind">${escapeHTML(t(kindKey))}</span>` +
          `<span class="step-index">${escapeHTML(
            t("step.label", { n: index + 1 })
          )}</span>` +
          "</div>" +
          `<div class="step-operation" aria-label="${escapeHTML(
            notationPlain(step)
          )}">${notationHTML(step)}</div>` +
          `<p class="step-desc">${escapeHTML(t(descriptionKey))}</p>` +
          renderMatrix(step.matrix, {
            target: step.target,
            source: step.source,
            pivot: step.pivot,
          }) +
          "</div>" +
          "</li>"
        );
      })
      .join("");

    const finalDescriptionKey =
      data.classification === "unique"
        ? "results.finalDesc"
        : data.classification === "infinite"
          ? "results.finalDescInfinite"
          : "results.finalDescNone";

    const finalIcon =
      data.classification === "none"
        ? "#i-alert"
        : data.classification === "infinite"
          ? "#i-infinity"
          : "#i-check";

    const finalStep =
      `<li class="step-card is-final${
        data.classification === "none" ? " is-inconsistent" : ""
      }" style="--delay:420ms">` +
      '<div class="step-marker" aria-hidden="true">' +
      `<svg class="icon"><use href="${finalIcon}"></use></svg>` +
      "</div>" +
      '<div class="step-content">' +
      '<div class="step-head">' +
      `<span class="step-kind">${escapeHTML(t("results.final"))}</span>` +
      '<span class="step-index">RREF</span>' +
      "</div>" +
      `<p class="step-desc">${escapeHTML(t(finalDescriptionKey))}</p>` +
      renderMatrix(data.final) +
      "</div>" +
      "</li>";

    $("#steps").innerHTML = initialStep + operationSteps + finalStep;
    $("#step-count").textContent = operationsLabel(data.steps.length);
    results.hidden = false;

    const copyButton = $("#copy-btn");
    if (copyButton) {
      copyButton.disabled = false;
    }

    if (options.scroll !== false) {
      window.requestAnimationFrame(() => {
        scrollToElement(results);
      });
    }
  }

  /* =======================================================
     Solving
     ======================================================= */

  function validateValues(matrix) {
    for (let row = 0; row < matrix.length; row += 1) {
      for (let col = 0; col < matrix[row].length; col += 1) {
        if (!matrix[row][col]) {
          showError("error.missing_cell", { row, col });
          return false;
        }
      }
    }
    return true;
  }

  async function solveCurrent() {
    const solveButton = $("#solve-btn");
    if (solveButton && solveButton.disabled) {
      return;
    }

    clearError();
    const matrix = readMatrix();
    if (!validateValues(matrix)) {
      return;
    }

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

      let data = null;
      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      if (!response.ok || !data || data.ok === false) {
        const key = ERROR_KEYS[data && data.error] || "error.generic";
        showError(key, {
          row: data && Number.isInteger(data.row) ? data.row : undefined,
          col: data && Number.isInteger(data.col) ? data.col : undefined,
        });
        return;
      }

      renderResults(data, { scroll: true });
    } catch (error) {
      showError("error.network");
    } finally {
      setLoading(false);
    }
  }

  function getCsrfToken() {
    const token = $('input[name="csrfmiddlewaretoken"]');
    return token ? token.value : "";
  }

  /* =======================================================
     Clipboard & toast
     ======================================================= */

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "-1000px";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }

  async function copySolution() {
    if (!state.result) {
      return;
    }
    const data = state.result;
    let text;
    if (data.classification === "unique" && Array.isArray(data.solution)) {
      text =
        `${t("results.unique")}\n` +
        data.solution.map((value, index) => `x${index + 1} = ${value}`).join("\n");
    } else {
      text = `${t(`results.${data.classification}`)}\n${t(
        `results.${data.classification}Sub`
      )}`;
    }

    try {
      await copyText(text);
      showToast("toast.copied");
    } catch (error) {
      showToast("error.generic");
    }
  }

  function showToast(key) {
    const toast = $("#toast");
    if (!toast) {
      return;
    }
    toast.textContent = t(key);
    toast.classList.add("is-visible");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  /* =======================================================
     Events
     ======================================================= */

  function bindEvents() {
    $("#theme-toggle").addEventListener("click", () => {
      setTheme(state.theme === "dark" ? "light" : "dark");
    });

    $$(".lang-btn").forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
      });
    });

    $$(".size-btn").forEach((button) => {
      button.addEventListener("click", () => {
        setSize(Number(button.dataset.size));
      });
    });

    $("#solver-form").addEventListener("submit", (event) => {
      event.preventDefault();
      solveCurrent();
    });

    $("#example-btn").addEventListener("click", () => {
      fillFromExample(state.size);
      clearError();
      hideResults();
      showToast("toast.example");
      solveCurrent();
    });

    $("#clear-btn").addEventListener("click", clearMatrix);
    $("#copy-btn").addEventListener("click", copySolution);

    $("#new-btn").addEventListener("click", () => {
      $("#solver-form").scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
      focusFirstInput();
    });

    const editor = $("#matrix-editor");

    editor.addEventListener("input", (event) => {
      const input = event.target.closest("input[data-row]");
      if (!input) {
        return;
      }
      const row = Number(input.dataset.row);
      const col = Number(input.dataset.col);
      state.values[row][col] = input.value;
      input.classList.remove("has-error");
      if (!$("#form-error").hidden) {
        clearError();
      }
    });

    editor.addEventListener("keydown", (event) => {
      const input = event.target.closest("input[data-row]");
      if (!input) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        solveCurrent();
        return;
      }

      let row = Number(input.dataset.row);
      let col = Number(input.dataset.col);
      let nextRow = row;
      let nextCol = col;

      if (event.key === "ArrowRight" && col < state.size) {
        nextCol = col + 1;
      } else if (event.key === "ArrowLeft" && col > 0) {
        nextCol = col - 1;
      } else if (event.key === "ArrowDown") {
        nextRow = Math.min(state.size - 1, row + 1);
      } else if (event.key === "ArrowUp") {
        nextRow = Math.max(0, row - 1);
      } else {
        return;
      }

      event.preventDefault();
      const nextInput = $(
        `#matrix-editor input[data-row="${nextRow}"][data-col="${nextCol}"]`
      );
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    });

    editor.addEventListener("paste", (event) => {
      const input = event.target.closest("input[data-row]");
      if (!input) {
        return;
      }
      const text = (event.clipboardData || window.clipboardData).getData("text");
      if (!text) {
        return;
      }
      const tokens = text
        .trim()
        .split(/[\s,;|]+/)
        .filter(Boolean);
      if (tokens.length < 2) {
        return;
      }

      event.preventDefault();
      let row = Number(input.dataset.row);
      let col = Number(input.dataset.col);

      tokens.forEach((token) => {
        if (row >= state.size) {
          return;
        }
        state.values[row][col] = token;
        const targetInput = $(
          `#matrix-editor input[data-row="${row}"][data-col="${col}"]`
        );
        if (targetInput) {
          targetInput.value = token;
          targetInput.classList.remove("has-error");
        }
        col += 1;
        if (col > state.size) {
          col = 0;
          row += 1;
        }
      });

      if (!$("#form-error").hidden) {
        clearError();
      }
    });
  }

  /* =======================================================
     Initialisation
     ======================================================= */

  function init() {
    state.theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    state.lang = document.documentElement.lang === "en" ? "en" : "es";

    Object.keys(examples).forEach((size) => {
      state.valuesBySize[Number(size)] = valuesFromExample(Number(size));
    });
    state.values = state.valuesBySize[3];

    applyTranslations();
    setTheme(state.theme, false);
    buildMatrixEditor();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
