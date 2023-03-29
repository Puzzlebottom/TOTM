from rest_framework import routers
from django.urls import re_path
from agents.api import AgentViewSet

router = routers.DefaultRouter()
router.register('agents', AgentViewSet, 'agents')

urlpatterns = router.urls