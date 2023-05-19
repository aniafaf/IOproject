import random

from .models import Group, Event


def validate_existing_group(form):
    if "group_id" not in form:
        raise ValueError("Form lacks group_id field.")
    group_id = form["group_id"]
    if not Group.objects.filter(id=group_id).exists():
        raise ValueError("Group does not exist.")


def validate_new_element(form):
    if "name" not in form:
        raise ValueError("Form lacks name field.")
    name = form["name"]
    if len(name) > 30 or len(name) == 0:
        raise ValueError("Name must contains between 1 to 30 characters.")


def create_group(user, form):
    validate_new_element(form)
    name = form["name"]
    hash = random.randint(10000000, 99999999)
    group = Group(admin=user, name=name, hash=hash)
    group.save()
    group.members.add(user)
    basic_event = Event(name="Other", group=group)
    basic_event.save()
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
    user_list = group.members.all()
    if user in user_list:
        raise ValueError("User is already in group.")
    group.members.add(user)


def create_event(form, group_id):
    validate_new_element(form)
    group = Group.objects.get(pk=group_id)
    name = form["name"]
    event = Event(name=name, group=group)
    if "location" in form:
        location = form["location"]
        if len(location) > 45:
            raise ValueError("Location must be under 45 characters.")
        event.location = form["location"]
    event.save()
    return event
