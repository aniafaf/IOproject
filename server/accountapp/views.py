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


from .models import UserGroup, Group, Event, Payment

from . import create_user, create_group

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
                    return JsonResponse({"ok": True, "error": None, "data": True})
                else:
                    return JsonResponse(
                        {
                            "ok": False,
                            "error": "Invalid username or password",
                            "data": None,
                        }
                    )

        except ValueError as e:
            return JsonResponse({"ok": False, "error": str(e), "data": None})
    else:
        return JsonResponse(
            {
                "ok": False,
                "error": f"Invalid method: expected POST but got {request.method}",
                "data": None,
            }
        )


@login_required(login_url="login")
def logout_my(request):
    logout(request)
    return JsonResponse({"ok": True, "error": None, "data": True})


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
                return JsonResponse({"ok": True, "error": None, "data": True})
            else:
                return JsonResponse({"ok": True, "error": "t", "data": True})
        except ValueError as e:
            return JsonResponse({"ok": False, "error": str(e), "data": None})
        except ValidationError as mail_error:
            return JsonResponse({"ok": False, "error": str(mail_error), "data": None})
        except IntegrityError:
            return JsonResponse(
                {"ok": False, "error": "Something went wrong", "data": None}
            )
        except SMTPException as smtpe:
            return JsonResponse({"ok": False, "error": str(smtpe), "data": None})


def activate(request: HttpRequest):
    # Validate the request
    if not request.body:
        return JsonResponse({"ok": False, "error": "Empty request body", "data": None})
    if request.method != "PATCH":
        return JsonResponse(
            {
                "ok": False,
                "error": f"Expected request method to be PATCH but got {request.method} instead.",
                "data": None,
            }
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
        return JsonResponse({"ok": False, "error": e, "data": None})

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
        return JsonResponse(
            {
                "ok": True,
                "error": None,
                "data": "Thank you for your email confirmation. "
                "Now you can log in to your account.",
            }
        )
    else:
        return JsonResponse(
            {"ok": False, "error": "Activation token is invalid!", "data": None}
        )


def delete_all(_):
    if os.environ.get("TEST") != "1":
        response = JsonResponse({"ok": False, "error": "TEST API only.", "data": None})
        response.status_code = 403
        return response

    try:
        user_model = get_user_model()
        del_res = user_model.objects.all().delete()
        return JsonResponse({"ok": True, "error": None, "data": del_res})
    except Exception as e:
        return JsonResponse({"ok": False, "error": e, "data": None})


@login_required(login_url="login")
def group_selected(request, pk):
    try:
        group = Group.objects.get(id=pk)
    except Model.DoesNotExist:
        return JsonResponse(
            {"ok": False, "error": "Group with given id does not exist", "data": None}
        )
    user = request.user
    try:
        UserGroup.objects.get(user=user, group=group)
    except Model.DoesNotExist:
        return JsonResponse(
            {"ok": False, "error": "You are not in this group", "data": None}
        )
    except Model.MultipleObjectsReturned:
        return JsonResponse(
            {
                "ok": False,
                "error": "Database is not working properly, tests only",
                "data": None,
            }
        )

    user_list = list(UserGroup.objects.filter(group=group).values("user"))
    event_list = list(group.event_set.all())
    return JsonResponse(
        {"ok": True, "error": None, "data": {"users": user_list, "events": event_list}}
    )


@login_required(login_url="login")
def group_list(request):
    user = request.user
    groups = list(UserGroup.objects.filter(user=user).values("group"))
    return JsonResponse({"ok": True, "error": None, "data": {"groups": groups}})


@login_required(login_url="login")
def create_group(request):
    # TODO complete functions in create_group.py file
    user = request.user
    try:
        if request.method == "POST":
            form = json.loads(request.body)
            create_group.validate_group(form)
            create_group.create_group(user, form["name"])
    # TODO change exception to more detailed one
    except Exception:
        return JsonResponse({"ok": False, "error": "#TODO", "data": None})
