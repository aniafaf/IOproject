from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(max_length=30, blank=False)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    hash = models.IntegerField()

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


class Payment(models.Model):
    name = models.CharField(max_length=30, blank=False)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.event) + ": " + str(self.name)


class Debtor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return str(self.payment) + ", " + str(self.user) + ": " + str(self.amount)
