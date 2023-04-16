import random

from .models import Group, UserGroup


def validate_existing_group(form):
    if "group_id" not in form:
        raise ValueError("Form lacks group_id field.")
    group_id = form["group_id"]
    if not Group.objects.filter(id=group_id).exists():
        raise ValueError("Group doesn't exits")


def validate_new_group(form):
    if "name" not in form:
        raise ValueError("Form lacks name field.")
    name = form["name"]
    if len(name) > 30 or len(name) == 0:
        raise ValueError("Group name must contains between 1 to 30 characters.")


def create_group(user, form):
    validate_new_group(form)
    name = form["name"]
    hash = random.randint(10000000, 99999999)
    group = Group(admin=user, name=name, hash=hash)
    group.save()
    connection = UserGroup(user=user, group=group)
    connection.save()
    return group


def add_to_group(user, form):
    validate_existing_group(form)
    group_id = form["group_id"]
    if "hash" not in form:
        raise ValueError("Form lacks hash field.")
    hash = form["hash"]
    try:
        group = Group.objects.get(pk=group_id, hash=hash)
    except Group.DoesNotExist:
        raise ValueError("Given link is not correct.")
    if UserGroup.objects.filter(user=user, group=group).exists():
        raise ValueError("User is already in group.")
    connection = UserGroup(user=user, group=group)
    connection.save()