import json
import os
from smtplib import SMTPException
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.db import IntegrityError


from . import create_user

from accountapp.token import account_activation_token


def login_to(request):
    if request.method == 'POST':
        form = json.loads(request.body)
        try:
            if "username" not in form:
                raise ValueError(f'Form lacks username field.')
            username = form['username']
            if create_user.validate_username(username):
                if "password" not in form:
                    raise ValueError(f'Form lacks password field.')
                password = form['password']
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({'ok': True, 'error': None, 'data': True})
                else:
                    return JsonResponse({'ok': False, 'error': 'Invalid username or password', 'data': None})

        except ValueError as e:
            return JsonResponse({'ok': False, 'error': str(e), 'data': None})


@login_required(login_url='login')
def logout_my(request):
    logout(request)
    return JsonResponse({'ok': True, 'error': None, 'data': True})


def signup(request):
    if request.method == 'POST':
        form = json.loads(request.body)
        try:
            if create_user.validate_registration(form):
                user = create_user.create_my_user(form)
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
