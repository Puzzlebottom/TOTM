from rest_framework import serializers
from encounters.models import Encounter

class EncounterSerializer(serializers.ModelSerializer):
    agents = serializers.PrimaryKeyRelatedField(many=True, allow_null=True, read_only=True)
    clusters = serializers.PrimaryKeyRelatedField(many=True, allow_null=True, read_only=True)

    class Meta:
        model = Encounter
        fields = '__all__'