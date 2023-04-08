from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(max_length=30, blank=False)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

