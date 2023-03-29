from rest_framework import routers
from django.urls import re_path
from encounters.api import EncounterViewSet

router = routers.DefaultRouter()
router.register('encounters', EncounterViewSet, 'encounters')

urlpatterns = router.urls