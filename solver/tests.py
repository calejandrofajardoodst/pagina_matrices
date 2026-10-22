"""Tests for the Gauss–Jordan solver and the JSON endpoint."""

from __future__ import annotations

import json
from fractions import Fraction

from django.test import Client, SimpleTestCase

from .gauss_jordan import (
    format_fraction,
    parse_matrix,
    solve_system,
)


def matrix_from_rows(rows: list[list[int]]) -> list[list[Fraction]]:
    return [[Fraction(value) for value in row] for row in rows]


class SolverTests(SimpleTestCase):
    def test_unique_2x2(self) -> None:
        result = solve_system(
            matrix_from_rows([[2, 1, 5], [1, -1, 1]])
        )
        self.assertEqual(result["classification"], "unique")
        self.assertEqual(result["solution"], ["2", "1"])
        self.assertEqual(result["rank"], 2)

    def test_row_swap_when_leading_entry_is_zero(self) -> None:
        result = solve_system(
            matrix_from_rows([[0, 1, 2], [1, 1, 3]])
        )
        self.assertEqual(result["classification"], "unique")
        self.assertEqual(result["solution"], ["1", "2"])
        self.assertEqual(result["steps"][0]["kind"], "swap")
        self.assertEqual(result["steps"][0]["target"], 0)
        self.assertEqual(result["steps"][0]["source"], 1)

    def test_unique_3x3(self) -> None:
        result = solve_system(
            matrix_from_rows(
                [
                    [1, 1, 1, 6],
                    [2, -1, 1, 3],
                    [1, 2, -1, 2],
                ]
            )
        )
        self.assertEqual(result["classification"], "unique")
        self.assertEqual(result["solution"], ["1", "2", "3"])

    def test_unique_4x4(self) -> None:
        result = solve_system(
            matrix_from_rows(
                [
                    [4, 1, 2, 3, 24],
                    [1, 5, 2, 1, 21],
                    [2, 1, 6, 2, 30],
                    [3, 2, 1, 7, 38],
                ]
            )
        )
        self.assertEqual(result["classification"], "unique")
        self.assertEqual(result["solution"], ["1", "2", "3", "4"])

    def test_unique_5x5(self) -> None:
        result = solve_system(
            matrix_from_rows(
                [
                    [5, 1, 0, 2, 1, 20],
                    [1, 6, 1, 0, 2, 26],
                    [0, 1, 7, 1, 1, 32],
                    [2, 0, 1, 8, 1, 42],
                    [1, 2, 1, 1, 9, 57],
                ]
            )
        )
        self.assertEqual(result["classification"], "unique")
        self.assertEqual(result["solution"], ["1", "2", "3", "4", "5"])

    def test_inconsistent_system(self) -> None:
        result = solve_system(
            matrix_from_rows([[1, 1, 1], [2, 2, 3]])
        )
        self.assertEqual(result["classification"], "none")
        self.assertIsNone(result["solution"])

    def test_infinite_solutions(self) -> None:
        result = solve_system(
            matrix_from_rows([[1, 1, 2], [2, 2, 4]])
        )
        self.assertEqual(result["classification"], "infinite")
        self.assertIsNone(result["solution"])
        self.assertLess(result["rank"], 2)

    def test_fraction_and_decimal_input(self) -> None:
        matrix = parse_matrix(
            {
                "size": 2,
                "matrix": [["1/2", "0,5", "2"], ["1", "-1", "0"]],
            }
        )
        self.assertEqual(matrix[0][0], Fraction(1, 2))
        self.assertEqual(matrix[0][1], Fraction(1, 2))
        result = solve_system(matrix)
        self.assertEqual(result["classification"], "unique")
        self.assertEqual(result["solution"], ["2", "2"])

    def test_scale_step_is_recorded(self) -> None:
        result = solve_system(
            matrix_from_rows([[2, 0, 4], [0, 1, 3]])
        )
        self.assertTrue(
            any(
                step["kind"] == "scale" and step["factor"] == "1/2"
                for step in result["steps"]
            )
        )

    def test_elimination_above_and_below(self) -> None:
        result = solve_system(
            matrix_from_rows(
                [
                    [1, 1, 1, 6],
                    [0, 1, 1, 5],
                    [0, 0, 1, 3],
                ]
            )
        )
        targets = {
            (step["kind"], step["target"])
            for step in result["steps"]
        }
        self.assertIn(("eliminate", 0), targets)
        self.assertIn(("eliminate", 1), targets)

    def test_each_step_contains_the_full_augmented_matrix(self) -> None:
        result = solve_system(
            matrix_from_rows([[2, 1, 5], [1, -1, 1]])
        )
        self.assertEqual(len(result["initial"]), 2)
        for step in result["steps"]:
            self.assertEqual(len(step["matrix"]), 2)
            self.assertEqual(len(step["matrix"][0]), 3)

    def test_format_fraction(self) -> None:
        self.assertEqual(format_fraction(Fraction(3, 1)), "3")
        self.assertEqual(format_fraction(Fraction(-6, 4)), "-3/2")


class ParseMatrixTests(SimpleTestCase):
    def test_missing_cell(self) -> None:
        with self.assertRaisesMessage(Exception, "missing_cell"):
            parse_matrix(
                {"size": 2, "matrix": [["1", "", "2"], ["3", "4", "5"]]}
            )

    def test_invalid_number_has_coordinates(self) -> None:
        with self.assertRaises(Exception) as context:
            parse_matrix(
                {"size": 2, "matrix": [["1", "abc", "2"], ["3", "4", "5"]]}
            )
        error = context.exception
        self.assertEqual(getattr(error, "code", None), "invalid_number")
        self.assertEqual(getattr(error, "row", None), 0)
        self.assertEqual(getattr(error, "col", None), 1)

    def test_invalid_size(self) -> None:
        with self.assertRaises(Exception) as context:
            parse_matrix({"size": 6, "matrix": []})
        self.assertEqual(getattr(context.exception, "code", None), "invalid_size")

    def test_invalid_shape(self) -> None:
        with self.assertRaises(Exception) as context:
            parse_matrix({"size": 3, "matrix": [["1", "2", "3", "4"]]})
        self.assertEqual(getattr(context.exception, "code", None), "invalid_matrix")


class EndpointTests(SimpleTestCase):
    def setUp(self) -> None:
        self.client = Client()

    def test_index_page_renders(self) -> None:
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Gauss–Jordan")
        self.assertContains(response, 'id="matrix-editor"')

    def test_health_endpoint(self) -> None:
        response = self.client.get("/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_solve_endpoint(self) -> None:
        response = self.client.post(
            "/api/solve/",
            data=json.dumps(
                {
                    "size": 3,
                    "matrix": [
                        ["1", "1", "1", "6"],
                        ["2", "-1", "1", "3"],
                        ["1", "2", "-1", "2"],
                    ],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertTrue(payload["ok"])
        self.assertEqual(payload["classification"], "unique")
        self.assertEqual(payload["solution"], ["1", "2", "3"])
        self.assertGreater(len(payload["steps"]), 0)

    def test_solve_endpoint_reports_cell_error(self) -> None:
        response = self.client.post(
            "/api/solve/",
            data=json.dumps(
                {
                    "size": 2,
                    "matrix": [["1", "no", "2"], ["3", "4", "5"]],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        payload = response.json()
        self.assertEqual(payload["error"], "invalid_number")
        self.assertEqual(payload["row"], 0)
        self.assertEqual(payload["col"], 1)

    def test_solve_endpoint_rejects_invalid_json(self) -> None:
        response = self.client.post(
            "/api/solve/",
            data="{not-json",
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "invalid_json")
