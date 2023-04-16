from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.models import User
import os
import re

name_pattern = r"^[A-Z][a-z]{0,149}$"
username_pattern = r"^[a-zA-Z0-9\_\-\+\.]{1,150}$"
password_pattern = r"^.{8,}$"


def validate_name(name):
    if re.fullmatch(name_pattern, name) is None:
        raise ValueError(f"The {name} is not a valid name.")

    return True


def validate_user_email(email):
    if validate_email(email):
        return True
    raise ValidationError


def validate_username(username):
    if re.fullmatch(username_pattern, username) is None:
        raise ValueError(
            f"Username must contain: minimum one character, only upper or lower case letters "
            f"and _, -, ., + symbols.",
        )

    return True


def validate_multiple_usernames(username):
    if User.objects.filter(username=username).count() > 0:
        raise ValueError(f"The username: {username} is already taken.")

    return True


def validate_password(password):
    if re.fullmatch(password_pattern, password) is None:
        raise ValueError(f"Password must contain: minimum eight characters.")

    return True


def validate_multiple_emails(email):
    if User.objects.filter(email=email).count() > 0:
        raise ValueError(f"Account on this email already exists.")

    return True


def check_fields(form):
    required_fields = ["email", "username", "password", "first_name", "last_name"]
    for field in required_fields:
        if field not in form:
            raise ValueError(f"Form lacks {field} field")


def validate_registration(form):
    check_fields(form)

    validate_email(form["email"])
    validate_multiple_emails(form["email"])

    validate_username(form["username"])
    validate_multiple_usernames(form["username"])

    validate_password(form["password"])

    validate_name(form["first_name"])
    validate_name(form["last_name"])

    return True


def create_my_user(form):
    email = form["email"]
    username = form["username"]
    password = form["password"]
    first_name = form["first_name"]
    last_name = form["last_name"]
    user = User.objects.create_user(
        username, email, password, first_name=first_name, last_name=last_name
    )
    user.is_active = str(os.environ.get("TEST") == "1")
    user.save()
    return user
