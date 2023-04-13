from .models import Group, UserGroup


def validate_group(form):
    if "group_id" not in form:
        raise ValueError(f"Form lacks group_id field")
    group_id = form["group_id"]
    if not Group.objects.filter(id=group_id).exists():
        raise ValueError(f"Group doesn't exits")


def create_group(user, name):
    group = Group(admin=user, name=name)
    group.save()
    connection = UserGroup(user=user, group=group)
    connection.save()


def add_to_group(group_id, user):
    group = Group.objects.get(pk=1)
    connection = UserGroup(user=user, group=group)
    connection.save()
