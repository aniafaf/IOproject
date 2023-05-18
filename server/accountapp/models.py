from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(max_length=30, blank=False)
    admin = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="administrates"
    )
    hash = models.IntegerField()
    members = models.ManyToManyField(User, related_name="app_groups")

    def __str__(self):
        return str(self.name)


class Event(models.Model):
    name = models.CharField(max_length=30, blank=False)
    location = models.CharField(max_length=45, blank=True)
    date = models.DateField(auto_now_add=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return (
            str(self.group)
            + ": "
            + str(self.name)
            + ", "
            + str(self.location)
            + "("
            + str(self.date)
            + ")"
        )


class Payment(models.Model):

    class Category(models.TextChoices):
        HOUSEHOLD = 'HH', 'Household'
        FOOD = 'F', 'Food'
        ENTERTAINMENT = 'E', 'Entertainment'
        OTHER = 'O', 'Other'

    name = models.CharField(max_length=30, blank=False)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    category = models.CharField(max_length=2, choices=Category.choices)

    def __str__(self):
        return str(self.event) + ": " + str(self.name)


class Debtor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return str(self.payment) + ", " + str(self.user) + ": " + str(self.amount)
