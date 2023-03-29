import json
import os
from smtplib import SMTPException

from django.contrib import messages
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.db import IntegrityError


from . import validation

from accountapp.token import account_activation_token


def login_to(request):
    if request.method == 'POST':
        form = json.loads(request.body)
        username = form['username']
        try:
            if validation.validate_username(username):
                password = form['password']
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    JsonResponse({'ok': True, 'error': None, 'data': True})
                else:
                    return JsonResponse({'ok': False, 'error': 'Invalid username or password', 'data': None})

        except ValueError as e:
            return JsonResponse({'ok': False, 'error': str(e), 'data': None})


@login_required(login_url='login')
def logout_my(request):
    logout(request)
    return JsonResponse({'ok': True, 'error': None, 'data': True})


# TODO moze warto bedzie to przeniesc do jakiegos osobnego pliku?
def create_my_user(form):
    email = form['email']
    username = form['username']
    password = form['password']
    first_name = form['first_name']
    last_name = form['last_name']
    user = User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)
    user.is_active = str(os.environ.get('TEST') == '1')
    user.save()
    return user


def signup(request):
    if request.method == 'POST':
        form = json.loads(request.body)
        try:
            if validation.validate_registration(form):
                user = create_my_user(form)
                current_site = get_current_site(request)
                mail_subject = 'Activation link has been sent to your email id'
                message = render_to_string('accountapp/account_activation_mail.html', {
                    'user': user.username,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                })
                to_email = form['email']
                email = EmailMessage(
                    mail_subject, message, to=[to_email]
                )
                email.send()
                return JsonResponse({'ok': True, 'error': None, 'data': True})
            else:
                JsonResponse({'ok': True, 'error': "t", 'data': True})
        except ValueError as e:
            return JsonResponse({'ok': False, 'error': str(e), 'data': None})
        except ValidationError as mail_error:
            return JsonResponse({'ok': False, 'error': str(mail_error), 'data': None})
        # TODO to lapie wszystkie errory gdzie coś koliduje z bazą danych, sprobuje to poprawic, żeby tyczyło to tylko
        # powtarzajacego sie username
        except IntegrityError:
            return JsonResponse({'ok': False, 'error': 'Username already exist', 'data': None})
        except SMTPException as smtpe:
            return JsonResponse({'ok': False, 'error': str(smtpe), 'data': None})


def test(request):
    return HttpResponse(json.dumps(dict(os.environ)))


def activate(request, uid, token):
    user_model = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uid))
        user = user_model.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, user_model.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return JsonResponse({'ok': True, 'error': None, 'data': "Thank you for your email confirmation. "
                                                                "Now you can log in to your account."})
    else:
        return JsonResponse({'ok': False, 'error': "Activation link is invalid!", 'data': None})

# TODO jak zdazymy
# def password_reset_request(request):
#     if request.method == "POST":
#         password_reset_form = PasswordResetForm(request.POST)
#         if password_reset_form.is_valid():
#             data = password_reset_form.cleaned_data.get('email')
#
#             associated_users = User.objects.filter(email=data)
#             for user in associated_users:
#                 mail_subject = "Password Reset Requested"
#                 current_site = get_current_site(request)
#                 #TODO
#                 message = render_to_string('TODO', {
#                     "email": user.email,
#                     'domain': current_site,
#                     'site_name': 'Website',
#                     "uid": urlsafe_base64_encode(force_bytes(user.pk)),
#                     "user": user.username,
#                     'token': default_token_generator.make_token(user),
#                     'protocol': 'http',
#                 })
#                 to_email = password_reset_form.cleaned_data.get('email')
#                 email = EmailMessage(
#                     mail_subject, message, to=[to_email]
#                 )
#                 email.send()
#                 return redirect("password_reset/done/")
#     password_reset_form = PasswordResetForm()
#     #TODO
#     return render(request=request, template_name="TODO",
#                   context={"password_reset_form": password_reset_form})
