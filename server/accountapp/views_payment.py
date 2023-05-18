import json
import os
from .models import Group, Event
from .constructors.session_guard import session_guard
from .constructors.api_response import (
    ok_response,
    error_response,
    session_expired_response,
)
from . import handle_payments


@session_guard
def create_payment(request, pk_g, pk_e):
    group = Group.objects.get(id=pk_g)
    user_list = group.members.all()
    user = request.user
    if user not in user_list:
        return error_response("You are not in this group")

    if request.method == "POST":
        try:
            form = json.loads(request.body)
            handle_payments.create_payment(user, form, pk_e)
            return ok_response(True)
        except ValueError as e:
            return error_response(str(e))

    user_list = list(
        user_list.values("id", "username", "first_name", "last_name", "email")
    )
    return ok_response({"users": user_list})
