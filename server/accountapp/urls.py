from django.urls import path
from . import views
import os

isTest = os.environ.get("TEST") == "1"

urlpatterns = [
    path("test/", views.test, name="test"),
    path("login/", views.login_to, name="login"),
    path("signup/", views.signup, name="signup"),
    path("activate/", views.activate, name="activate"),
]

if isTest:
    urlpatterns.extend([path("delete-all/", views.delete_all, name="delete-all")])
