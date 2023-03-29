from rest_framework import routers
from django.urls import re_path
from clusters.api import ClusterViewSet

router = routers.DefaultRouter()
router.register('clusters', ClusterViewSet, 'clusters')

urlpatterns = router.urls