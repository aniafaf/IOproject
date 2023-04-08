from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(max_length=30, blank=False)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)


class UserGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user.username) + " " + str(self.group.name)


class Event(models.Model):
    name = models.CharField(max_length=30, blank=False)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.group) + ": " + str(self.name)

    def save(self, *args, **kwargs):
        if self.group.event_set.count() > 0:
            raise ValueError
        super(Event, self).save(*args, **kwargs)
