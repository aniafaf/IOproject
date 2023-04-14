import json
import os
from smtplib import SMTPException
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.db.models import Model
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.http import JsonResponse, HttpResponse, HttpRequest
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.contrib.auth.models import User
from .constructors.api_response import (
    ok_response,
    error_response,
    session_expired_response,
)

from .models import UserGroup, Group, Event, Payment

from . import create_user, group

from accountapp.token import account_activation_token


def login_to(request):
    if request.method == "POST":
        form = json.loads(request.body)
        try:
            if "username" not in form:
                raise ValueError(f"Form lacks username field.")
            username = form["username"]
            if create_user.validate_username(username):
                if "password" not in form:
                    raise ValueError(f"Form lacks password field.")
                password = form["password"]
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    return ok_response(True)
                else:
                    return error_response("Invalid username or password")

        except ValueError as e:
            return error_response(str(e))
    else:
        return error_response(f"Invalid method: expected POST but got {request.method}")


def logout_my(request):
    if request.user.is_authenticated:
        logout(request)
    return ok_response(True)


def signup(request):
    if request.method == "POST":
        form = json.loads(request.body)
        try:
            if create_user.validate_registration(form):
                user = create_user.create_my_user(form)
                current_site = get_current_site(request)
                mail_subject = "Activation link has been sent to your email id"
                message = render_to_string(
                    "accountapp/account_activation_mail.html",
                    {
                        "user": user.username,
                        "domain": current_site.domain,
                        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                        "token": account_activation_token.make_token(user),
                    },
                )
                to_email = form["email"]
                email = EmailMessage(mail_subject, message, to=[to_email])
                email.send()
                return ok_response(True)
            else:
                return ok_response(True)
        except ValueError as e:
            return error_response(str(e))
        except ValidationError as mail_error:
            return error_response(str(mail_error))
        except IntegrityError:
            return error_response("Something went wrong")
        except SMTPException as smtpe:
            return error_response(str(smtpe))


def activate(request: HttpRequest):
    # Validate the request
    if not request.body:
        return error_response("Empty request body")
    if request.method != "PATCH":
        return error_response(
            f"Expected request method to be PATCH but got {request.method} instead."
        )

    body = dict()
    try:
        _body = json.loads(request.body)
        if "token" not in _body:
            raise Exception(
                "Expected request body to contain a 'token' field of type string."
            )
        if "uid" not in _body:
            raise Exception(
                "Expected request body to contain a 'uid' field of type string."
            )
        body = _body
    except Exception as e:
        return error_response(e)

    # Process the request
    uid = body["uid"]
    token = body["token"]

    user_model = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uid))
        user = user_model.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, user_model.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return ok_response(
            "Thank you for your email confirmation. "
            "Now you can log in to your account."
        )
    else:
        return error_response("Activation token is invalid!")


def delete_all(_):
    if os.environ.get("TEST") != "1":
        return error_response("TEST API only.", status=403)

    try:
        user_model = get_user_model()
        del_res = user_model.objects.all().delete()
        return ok_response(del_res)
    except Exception as e:
        return error_response(e)


def group_selected(request, pk):
    if not request.user.is_authenticated:
        return session_expired_response(request)
    try:
        group = Group.objects.get(id=pk)
    except Group.DoesNotExist:
        return error_response("Group with given id does not exist")
    user = request.user
    try:
        UserGroup.objects.get(user=user, group=group)
    except UserGroup.DoesNotExist:
        return error_response("You are not in this group")
    except UserGroup.MultipleObjectsReturned:
        return error_response("Database is not working properly, tests only")

    user_id_list = UserGroup.objects.filter(group=group).values_list("user", flat=True)
    user_list = list(User.objects.filter(id__in=user_id_list).values("id", "username", "first_name",
                                                                     "last_name", "email"))
    event_list = list(group.event_set.all().values())
    group = list(Group.objects.filter(id=pk).values())
    return ok_response({"group": group, "users": user_list, "events": event_list})


def group_list(request):
    if not request.user.is_authenticated:
        return session_expired_response(request)
    user = request.user
    group_id_list = UserGroup.objects.filter(user=user).values_list("group", flat=True)
    group_list = list(Group.objects.filter(id__in=group_id_list).values("id", "name"))
    return ok_response({"groups": group_list})


def create_group(request):
    if not request.user.is_authenticated:
        return session_expired_response(request)
    if request.method == "POST":
        try:
            form = json.loads(request.body)
            user = request.user
            group.create_group(user, form)
            return ok_response(True)
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
            group.add_to_group(user, form)
            return ok_response(True)
        except ValueError as e:
            return error_response(str(e))
    else:
        return error_response(f"Invalid method: expected POST but got {request.method}")
