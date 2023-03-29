from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('api/', include('accounts.urls')),
    path('api/', include('encounters.urls')),
    path('api/', include('clusters.urls')),
    path('api/', include('agents.urls')),
]