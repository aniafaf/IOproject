from .models import Group, UserGroup


def validate_existing_group(form):
    if "group_id" not in form:
        raise ValueError("Form lacks group_id field")
    group_id = form["group_id"]
    if not Group.objects.filter(id=group_id).exists():
        raise ValueError("Group doesn't exits")


def validate_new_group(form):
    if "name" not in form:
        raise ValueError("Form lacks name field")
    name = form["name"]
    if name.len > 30 or name.len == 0:
        raise ValueError("Group name must contains between 1 to 30 characters")


def create_group(user, form):
    validate_new_group(form)
    name = form["name"]
    group = Group(admin=user, name=name)
    group.save()
    connection = UserGroup(user=user, group=group)
    connection.save()


def add_to_group(user, form):
    validate_existing_group(form)
    group_id = form["group_id"]
    group = Group.objects.get(pk=group_id)
    connection = UserGroup(user=user, group=group)
    connection.save()
