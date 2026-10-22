"""Exact Gauss–Jordan elimination with a full record of every row operation.

The public API is intentionally small:

``parse_matrix`` validates a JSON payload and returns exact fractions.
``solve_system`` receives that matrix and returns a JSON-serialisable result
with the initial augmented matrix, each intermediate matrix, the final reduced
row echelon form and the classification of the linear system.
"""

from __future__ import annotations

from fractions import Fraction
from typing import Any

MIN_SIZE = 2
MAX_SIZE = 5
MAX_INPUT_LENGTH = 32


class MatrixInputError(ValueError):
    """A validation error that can be shown next to a matrix cell."""

    def __init__(
        self,
        code: str,
        *,
        row: int | None = None,
        col: int | None = None,
    ) -> None:
        super().__init__(code)
        self.code = code
        self.row = row
        self.col = col


def format_fraction(value: Fraction) -> str:
    """Return a compact, exact string: ``3``, ``-1/2``, ``7/3``…"""

    if value.denominator == 1:
        return str(value.numerator)
    return f"{value.numerator}/{value.denominator}"


def parse_cell(raw: Any, row: int, col: int) -> Fraction:
    """Parse one cell accepting integers, decimals and fractions."""

    if raw is None or isinstance(raw, bool):
        code = "missing_cell" if raw is None or raw == "" else "invalid_number"
        raise MatrixInputError(code, row=row, col=col)

    text = str(raw).strip()
    if not text:
        raise MatrixInputError("missing_cell", row=row, col=col)
    if len(text) > MAX_INPUT_LENGTH:
        raise MatrixInputError("invalid_number", row=row, col=col)

    # Normalise common keyboard / clipboard characters.
    text = (
        text.replace("\u2212", "-")  # Unicode minus
        .replace("\u2013", "-")  # en dash
        .replace("\u2014", "-")  # em dash
        .replace("\u00a0", "")
        .replace(" ", "")
        .replace(",", ".")
    )

    try:
        return Fraction(text)
    except (ValueError, ZeroDivisionError):
        raise MatrixInputError("invalid_number", row=row, col=col) from None


def parse_matrix(payload: Any) -> list[list[Fraction]]:
    """Validate a JSON payload and return the augmented matrix."""

    if not isinstance(payload, dict):
        raise MatrixInputError("invalid_matrix")

    size = payload.get("size")
    if isinstance(size, bool) or not isinstance(size, int):
        raise MatrixInputError("invalid_size")
    if not MIN_SIZE <= size <= MAX_SIZE:
        raise MatrixInputError("invalid_size")

    raw_matrix = payload.get("matrix")
    if not isinstance(raw_matrix, list) or len(raw_matrix) != size:
        raise MatrixInputError("invalid_matrix")

    matrix: list[list[Fraction]] = []
    for row_index, raw_row in enumerate(raw_matrix):
        if not isinstance(raw_row, list) or len(raw_row) != size + 1:
            raise MatrixInputError("invalid_matrix")
        matrix.append(
            [
                parse_cell(value, row_index, col_index)
                for col_index, value in enumerate(raw_row)
            ]
        )
    return matrix


def _snapshot(matrix: list[list[Fraction]]) -> list[list[str]]:
    return [[format_fraction(value) for value in row] for row in matrix]


def _record_step(
    kind: str,
    target: int,
    source: int,
    factor: Fraction | None,
    matrix: list[list[Fraction]],
    pivot: tuple[int, int] | None,
) -> dict[str, Any]:
    return {
        "kind": kind,
        "target": target,
        "source": source,
        "factor": format_fraction(factor) if factor is not None else None,
        "matrix": _snapshot(matrix),
        "pivot": list(pivot) if pivot is not None else None,
    }


def solve_system(matrix: list[list[Fraction]]) -> dict[str, Any]:
    """Run Gauss–Jordan with partial pivoting and record every transformation.

    The result contains the following keys:

    ``initial``
        The augmented matrix before any operation.
    ``steps``
        Ordered operations. Each one contains ``kind`` (``swap``, ``scale`` or
        ``eliminate``), ``target``, ``source``, ``factor``, ``pivot`` and the
        matrix *after* the operation.
    ``final``
        The reduced row echelon form.
    ``classification``
        ``unique``, ``infinite`` or ``none``.
    ``solution``
        A list of exact strings when the solution is unique, otherwise null.
    ``rank``
        Rank of the coefficient matrix.
    """

    size = len(matrix)
    augmented = [row[:] for row in matrix]
    initial = _snapshot(augmented)
    steps: list[dict[str, Any]] = []
    pivot_columns: list[int] = []
    pivot_row = 0

    for column in range(size):
        if pivot_row >= size:
            break

        # Partial pivoting: use the row with the largest absolute value.
        pivot = max(
            range(pivot_row, size),
            key=lambda candidate: abs(augmented[candidate][column]),
        )
        if augmented[pivot][column] == 0:
            # This column has no pivot; the corresponding variable is free.
            continue

        if pivot != pivot_row:
            augmented[pivot_row], augmented[pivot] = (
                augmented[pivot],
                augmented[pivot_row],
            )
            steps.append(
                _record_step(
                    "swap",
                    pivot_row,
                    pivot,
                    None,
                    augmented,
                    (pivot_row, column),
                )
            )

        pivot_value = augmented[pivot_row][column]
        if pivot_value != 1:
            multiplier = Fraction(1, 1) / pivot_value
            augmented[pivot_row] = [
                value * multiplier for value in augmented[pivot_row]
            ]
            steps.append(
                _record_step(
                    "scale",
                    pivot_row,
                    pivot_row,
                    multiplier,
                    augmented,
                    (pivot_row, column),
                )
            )

        # Gauss–Jordan eliminates every other row, not only the rows below.
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
            steps.append(
                _record_step(
                    "eliminate",
                    row,
                    pivot_row,
                    factor,
                    augmented,
                    (pivot_row, column),
                )
            )

        pivot_columns.append(column)
        pivot_row += 1

    rank = len(pivot_columns)
    inconsistent = any(
        all(augmented[row][column] == 0 for column in range(size))
        and augmented[row][size] != 0
        for row in range(size)
    )

    solution: list[str] | None = None
    if inconsistent:
        classification = "none"
    elif rank < size:
        classification = "infinite"
    else:
        classification = "unique"
        values: list[Fraction | None] = [None] * size
        for row, column in enumerate(pivot_columns):
            values[column] = augmented[row][size]
        solution = [
            format_fraction(value) if value is not None else "0"
            for value in values
        ]

    return {
        "ok": True,
        "size": size,
        "initial": initial,
        "steps": steps,
        "final": _snapshot(augmented),
        "classification": classification,
        "solution": solution,
        "rank": rank,
    }
