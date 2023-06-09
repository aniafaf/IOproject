import json
from .models import Group, Event, Payment, User, Debtor
from .constructors.session_guard import session_guard
from .constructors.api_response import (
    ok_response,
    error_response,
    session_expired_response,
)
from . import handle_payments


@session_guard
def create_payment(request, pk_g, pk_e):
    try:
        group = Group.objects.get(id=pk_g)
    except Group.DoesNotExist:
        return error_response("Group with given id does not exist")
    user = request.user
    user_list = group.members.all()
    if user not in user_list:
        return error_response("You are not in this group")
    try:
        event = Event.objects.get(id=pk_e)
    except Event.DoesNotExist:
        return error_response("Event with given id does not exist")

    if event.group != group:
        return error_response("This event does not exist in your group")

    if request.method == "POST":
        try:
            form = json.loads(request.body)
            handle_payments.create_payment(user, form, pk_e)
            return ok_response(True)
        except ValueError as e:
            return error_response(str(e))
    user_list = list(
        user_list.values("id", "username", "first_name", "last_name", "email")
    )
    return ok_response({"users": user_list})


@session_guard
def payment_selected(request, pk_g, pk_e, pk_p):
    try:
        group = Group.objects.get(id=pk_g)
    except Group.DoesNotExist:
        return error_response("Group with given id does not exist")
    user = request.user
    user_list = group.members.all()
    if user not in user_list:
        return error_response("You are not in this group")
    try:
        event = Event.objects.get(id=pk_e)
    except Event.DoesNotExist:
        return error_response("Event with given id does not exist")
    if event.group != group:
        return error_response("This event does not exist in your group")
    try:
        payment = Payment.objects.get(id=pk_p)
    except Payment.DoesNotExist:
        return error_response("Payment with given id does not exist")
    if payment.event != event:
        return error_response("This payment does not exist in this event")

    debtors = payment.debtor_set.all()
    debtors_list = []
    for debtor in debtors:
        user = debtor.user
        element = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "amount": debtor.amount,
        }
        debtors_list.append(element)
    payment = Payment.objects.filter(id=pk_p).values().first()
    return ok_response({"payment": payment, "debtors": debtors_list})


@session_guard
def set_debt_done(request, pk_g, pk_e, pk_p):
    if request.method != "PATCH":
        return error_response(
            f"Expected request method to be PATCH but got {request.method} instead."
        )
    form = json.loads(request.body)
    if "pk_u" not in form:
        return error_response("Expected field with users id")
    pk_u = form["pk_u"]

    try:
        group = Group.objects.get(id=pk_g)
    except Group.DoesNotExist:
        return error_response("Group with given id does not exist")
    user = request.user
    user_list = group.members.all()
    if user not in user_list:
        return error_response("You are not in this group")
    try:
        event = Event.objects.get(id=pk_e)
    except Event.DoesNotExist:
        return error_response("Event with given id does not exist")
    if event.group != group:
        return error_response("This event does not exist in your group")
    try:
        payment = Payment.objects.get(id=pk_p)
    except Payment.DoesNotExist:
        return error_response("Payment with given id does not exist")
    if payment.event != event:
        return error_response("This payment does not exist in this event")
    try:
        debtor = User.objects.get(id=pk_u)
    except User.DoesNotExist:
        return error_response("That user do not exist")
    if debtor not in user_list:
        return error_response("That debtor do not belong to this group")
    user_list = payment.debtor_set.all()
    if debtor not in user_list:
        return error_response("That debtor has not any debt in that payment")
    if user != payment.lender:
        return error_response("Only lender can change payment status")

    try:
        debt = Debtor.objects.get(user=debtor, payment=payment)
        debt.active = False
        debt.save()
    except Debtor.DoesNotExist:
        return error_response("That debtor is not valid")

    return ok_response("Everything went correctly.")
