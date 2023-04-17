import json
import os
from django.contrib.auth.models import User
from .constructors.api_response import (
    ok_response,
    error_response,
    session_expired_response,
)

from .models import Group

from . import handle_groups


def group_selected(request, pk):
    if not request.user.is_authenticated:
        return session_expired_response(request)
    try:
        group = Group.objects.get(id=pk)
    except Group.DoesNotExist:
        return error_response("Group with given id does not exist")
    user = request.user
    user_list = group.members.all()
    if user not in user_list:
        return error_response("You are not in this group")

    user_list = list(
        user_list.values("id", "username", "first_name", "last_name", "email")
    )
    event_list = list(group.event_set.all().values())
    group = Group.objects.filter(id=pk).values().first()
    return ok_response({"group": group, "users": user_list, "events": event_list})


def group_list(request):
    if not request.user.is_authenticated:
        return session_expired_response(request)
    user = request.user
    group_list = list(user.app_groups.all().values())
    return ok_response({"groups": group_list})


def create_group(request):
    if not request.user.is_authenticated:
        return session_expired_response(request)
    if request.method == "POST":
        try:
            form = json.loads(request.body)
            user = request.user
            new_group = handle_groups.create_group(user, form)
            return ok_response(
                dict(
                    id=new_group.pk,
                    name=new_group.name,
                    hash=new_group.hash,
                    admin_id=new_group.admin.pk,
                )
            )
        except ValueError as e:
            return error_response(str(e))
    else:
        return error_response(f"Invalid method: expected POST but got {request.method}")


def join_group(request):
    if not request.user.is_authenticated:
        return session_expired_response(request)
    if request.method == "POST":
        try:
            form = json.loads(request.body)
            user = request.user
            handle_groups.add_to_group(user, form)
            return ok_response(True)
        except ValueError as e:
            return error_response(str(e))
    else:
        return error_response(f"Invalid method: expected POST but got {request.method}")


def delete_all_groups(_):
    if os.environ.get("TEST") != "1":
        return error_response("TEST API only.", status=403)

    try:
        del_res = Group.objects.all().delete()
        return ok_response(del_res)
    except Exception as e:
        return error_response(e)
