from django.urls import path
from . import views_register, views_group, views_payment
import os

isTest = os.environ.get("TEST") == "1"

urlpatterns = [
    path("login/", views_register.login_to, name="login"),
    path("signup/", views_register.signup, name="signup"),
    path("activate/", views_register.activate, name="activate"),
    path("group/<int:pk>/", views_group.group_selected, name="group_selected"),
    path("group/<int:pk>/create_event/", views_group.create_event, name="create_event"),
    path(
        "group/<int:pk_g>/event/<int:pk_e>/",
        views_group.event_selected,
        name="event_selected",
    ),
    path(
        "group/<int:pk_g>/event/<int:pk_e>/create_payment/",
        views_payment.create_payment,
        name="create_payment",
    ),
    path("group/<int:pk_g>/event/<int:pk_e>/payment/<int:pk_p>/", views_payment.payment_selected, name="payment_selected"),
    path("group_list/", views_group.group_list, name="group_list"),
    path("create_group/", views_group.create_group, name="create_group"),
    path("join/", views_group.join_group, name="join_group"),
    path("logout/", views_register.logout_my, name="logout"),
    path("whoami/", views_register.whoami, name="who_am_i"),
]

if isTest:
    urlpatterns.extend(
        [
            path("delete-all/", views_register.delete_all, name="delete-all"),
            path(
                "delete-all-groups/",
                views_group.delete_all_groups,
                name="delete-all-groups",
            ),
        ]
    )
