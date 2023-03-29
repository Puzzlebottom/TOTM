from django.urls import path, include
from .api import RegisterAPI, LoginAPI, LogoutAPI, UserAPI

urlpatterns = [
    path('auth/register', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/user/', UserAPI.as_view()),
    path('auth/logout', LogoutAPI.as_view()),
]
