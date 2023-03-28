import os
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.http import JsonResponse

from .forms import SignupForm

from accountapp.token import account_activation_token


def login_to(request):
    if request.method == 'POST':
        user_name = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user_name = User.objects.get(username=user_name)
        except:
            messages.error(request, "Wrong username or password")
        user_authenticate = authenticate(request, username=user_name, password=password)
        if user_authenticate is not None:
            login(request, user_authenticate)
            return JsonResponse({'ok': False, 'error': "Invalid", 'data': None})
        else:
            messages.error(request, "Wrong username or password !!!")
    return JsonResponse({'ok': True, 'error': None, 'data': True})


@login_required(login_url='login')
def logout_my(request):
    logout(request)
    return JsonResponse({'ok': True, 'error': None, 'data': True})


def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            if str(os.environ.get('TEST') == '1'):
                user.is_active = True
            user.save()
            current_site = get_current_site(request)
            mail_subject = 'Activation link has been sent to your email id'
            message = render_to_string('accountapp/account_activation_mail.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(
                mail_subject, message, to=[to_email]
            )
            email.send()
            return JsonResponse({'ok': True, 'error': None, 'data': True})

    return JsonResponse({'ok': False, 'error': "Invalid", 'data': None})


def activate(request, uidb64, token):
    user_model = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
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
#                     "user": user,
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
