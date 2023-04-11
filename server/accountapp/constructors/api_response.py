from typing import TypeVar
from django.http import JsonResponse, HttpResponse, HttpRequest
from django.contrib.auth import logout

T = TypeVar("T")


def ok_response(
    data: T,
    status=200,
) -> JsonResponse:
    res = JsonResponse(dict(ok=True, error=None, data=data))
    res.status_code = status
    return res


def error_response(error: T, status=400) -> JsonResponse:
    res = JsonResponse(dict(ok=False, error=error, data=None))
    res.status_code = status
    return res


def session_expired_response(request: HttpRequest) -> JsonResponse:
    res = JsonResponse(
        dict(ok=False, error="Session has expired", data=None, redirect="/login")
    )
    res.status_code = 401
    try:
        logout(request)
    except Exception:
        pass

    return res
