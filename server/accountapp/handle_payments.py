from .models import Group, Payment, Event, Debtor
from django.contrib.auth.models import User
from decimal import *

# TODO
def validate_new_element(form):
    if "name" not in form:
        raise ValueError("Form lacks name field.")
    name = form["name"]
    if len(name) > 30 or len(name) == 0:
        raise ValueError("Name must contains between 1 to 30 characters.")

    if "amount" not in form:
        raise ValueError("Form lacks amount field.")


def get_category(category):
    categories = {"F": Payment.Category.FOOD, "HH": Payment.Category.HOUSEHOLD, "E": Payment.Category.ENTERTAINMENT,
                  "O": Payment.Category.OTHER}
    if category in categories.keys():
        return categories[category]
    else:
        raise ValueError(f"The {category} is not a valid category. Possible Categories are: HH, F, E, O")


def create_payment(user, form, pk_e):
    validate_new_element(form)
    name = form["name"]
    amount = Decimal(form["amount"]).quantize(Decimal('.01'), rounding=ROUND_DOWN)
    event = Event.objects.get(id=pk_e)
    payment = Payment(name=name, amount=amount, lender=user, event=event)
    if "category" in form:
        category = get_category(form["category"])
        payment.category = category

    if "description" in form:
        payment.description = form["description"]
    payment.save()

    if "users_id" not in form:
        raise ValueError("Form lacks users_id field.")
    users_id = form["users_id"]
    if len(users_id) == 0:
        raise ValueError("Users id list cannot be empty.")

    for id in users_id:
        try:
            User.objects.get(id=id)
        except User.DoesNotExist:
            payment.delete()
            raise ValueError("User with given id does not exist.")

    if "even" in form:
        even_split = (amount / Decimal(len(users_id))).quantize(Decimal('.01'), rounding=ROUND_DOWN)
        for id in users_id:
            user = User.objects.get(id=id)
            debtor = Debtor(user=user, payment=payment, amount=even_split)
            debtor.save()
    else:
        users_debt = form["users_debt"]
        for id, debt in zip(users_id, users_debt):
            user = User.objects.get(id=id)
            debtor = Debtor(user=user, payment=payment, amount=debt)
            debtor.save()
