from rest_framework import serializers
from clusters.models import Cluster

class ClusterSerializer(serializers.ModelSerializer):
    encounter = serializers.PrimaryKeyRelatedField(read_only=True, allow_null=True)

    class Meta:
        model = Cluster
        fields = '__all__'