from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test, name='test'),
    path('login/', views.login_to, name='login'),
    path('signup/', views.signup, name='signup'),
    path('activate/', views.activate, name='activate')
]
