from .models import Group, UserGroup


def validate_group(form):
    pass


def create_group(user, name):
    group = Group(admin=user, name=name)
    group.save()
    connection = UserGroup(user=user, group=group)
    connection.save()
