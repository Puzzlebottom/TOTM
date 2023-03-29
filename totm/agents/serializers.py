from rest_framework import serializers
from agents.models import Agent

class AgentSerializer(serializers.ModelSerializer):
    encounter = serializers.PrimaryKeyRelatedField(read_only=True, allow_null=True)

    class Meta:
        model = Agent
        fields = '__all__'