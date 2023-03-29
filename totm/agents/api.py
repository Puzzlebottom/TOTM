from agents.models import Agent
from clusters.models import Cluster
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from clusters.serializers import ClusterSerializer
from .serializers import AgentSerializer
from encounters.models import Encounter

class AgentViewSet(viewsets.ModelViewSet):
    serializer_class = AgentSerializer

    def get_queryset(self):
        return Agent.objects.all()

    def perform_create(self, serializer):
        if 'encounter' in self.request.data:
            encounter = Encounter.objects.get(id=self.request.data['encounter'])
            serializer.save(encounter=encounter)
            return Response(serializer.data)
        else:
            serializer.save()
            return Response(serializer.data)

    @action(detail=True)
    def select(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        agent = Agent.objects.get(pk=pk)
        query_set = agent.clusters.all()
        clusters = ClusterSerializer(query_set, many=True)
        return Response({"agent": AgentSerializer(agent).data, "clusters": clusters.data})

    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        agent = self.get_object()
        encounter = Encounter.objects.get(id=self.request.data['encounterId'])
        agent.pk = None
        agent.encounter = encounter
        serializer = AgentSerializer(agent, data={"name": agent.name, "type": agent.type, "encounter": agent.encounter})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        
        

