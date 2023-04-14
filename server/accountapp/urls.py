from django.urls import path
from . import views
import os

isTest = os.environ.get("TEST") == "1"

urlpatterns = [
    path("login/", views.login_to, name="login"),
    path("signup/", views.signup, name="signup"),
    path("activate/", views.activate, name="activate"),
    path("group/<int:pk>/", views.group_selected, name="group_selected"),
    path("group_list/", views.group_list, name="group_list"),
    path("create_group/", views.create_group, name="create_group"),
    path("join/", views.join_group, name="join_group"),
    path("logout/", views.logout_my, name="logout"),
]

if isTest:
    urlpatterns.extend(
        [
            path("delete-all/", views.delete_all, name="delete-all"),
            path(
                "delete-all-groups/", views.delete_all_groups, name="delete-all-groups"
            ),
        ]
    )
