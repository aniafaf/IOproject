from .models import Group, Payment, Event, Debtor
from django.contrib.auth.models import User


# TODO
def validate_new_element(form):
    pass


def create_payment(user, form, pk_e):
    validate_new_element(form)
    name = form["name"]
    amount = int(form["amount"])
    event = Event.objects.get(id=pk_e)
    payment = Payment(name=name, amount=amount, lender=user, event=event)
    if "category" in form:
        category = form["category"]
        if category == "F":
            payment.category = Payment.Category.FOOD
        elif category == "HH":
            payment.category = Payment.Category.HOUSEHOLD
        elif category == "E":
            payment.category = Payment.Category.ENTERTAINMENT
        elif category == "O":
            payment.category = Payment.Category.OTHER
        else:
            raise ValueError(
                f"The {category} is not a valid category. Possible Categories are: HH, F, E, O"
            )
    if "description" in form:
        payment.description = form["description"]
    payment.save()

    users_id = form["users_id"]
    if "even" in form:
        even_split = amount / len(users_id)
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
