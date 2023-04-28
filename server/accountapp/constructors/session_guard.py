from typing import Callable, Concatenate
from django.http import JsonResponse, HttpRequest
from .api_response import session_expired_response


def session_guard(func: Callable[..., JsonResponse]) -> Callable[..., JsonResponse]:
    return (
        lambda request, *args, **kwargs: session_expired_response(request)
        if not request.user.is_authenticated
        else func(request, *args, **kwargs)
    )
