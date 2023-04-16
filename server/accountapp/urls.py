from django.urls import path
from . import register_views, group_views
import os

isTest = os.environ.get("TEST") == "1"

urlpatterns = [
    path("login/", register_views.login_to, name="login"),
    path("signup/", register_views.signup, name="signup"),
    path("activate/", register_views.activate, name="activate"),
    path("group/<int:pk>/", group_views.group_selected, name="group_selected"),
    path("group_list/", group_views.group_list, name="group_list"),
    path("create_group/", group_views.create_group, name="create_group"),
    path("join/", group_views.join_group, name="join_group"),
    path("logout/", register_views.logout_my, name="logout"),
]

if isTest:
    urlpatterns.extend(
        [
            path("delete-all/", register_views.delete_all, name="delete-all"),
            path(
                "delete-all-groups/", group_views.delete_all_groups, name="delete-all-groups"
            ),
        ]
    )
