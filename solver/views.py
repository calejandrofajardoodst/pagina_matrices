"""HTTP views for the matrix solver."""

from __future__ import annotations

import json
import logging

from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_GET, require_POST

from .gauss_jordan import MatrixInputError, parse_matrix, solve_system

logger = logging.getLogger(__name__)

MAX_BODY_BYTES = 32 * 1024


@require_GET
def index(request: HttpRequest):
    return render(request, "index.html")


@require_GET
def health(_request: HttpRequest) -> JsonResponse:
    return JsonResponse({"status": "ok"})


@require_POST
@csrf_protect
def solve_view(request: HttpRequest) -> JsonResponse:
    if len(request.body) > MAX_BODY_BYTES:
        return JsonResponse(
            {"ok": False, "error": "payload_too_large"},
            status=413,
        )

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return JsonResponse(
            {"ok": False, "error": "invalid_json"},
            status=400,
        )

    try:
        matrix = parse_matrix(payload)
        return JsonResponse(solve_system(matrix))
    except MatrixInputError as exc:
        return JsonResponse(
            {
                "ok": False,
                "error": exc.code,
                "row": exc.row,
                "col": exc.col,
            },
            status=400,
        )
    except Exception:  # pragma: no cover - defensive safety net
        logger.exception("Unexpected error while solving a matrix")
        return JsonResponse(
            {"ok": False, "error": "server_error"},
            status=500,
        )
