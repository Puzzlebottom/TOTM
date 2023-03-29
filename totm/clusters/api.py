from clusters.models import Cluster
from agents.models import Agent
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, permissions
from .serializers import ClusterSerializer
from agents.serializers import AgentSerializer
from encounters.models import Encounter
import json
from rest_framework.renderers import JSONRenderer



class ClusterViewSet(viewsets.ModelViewSet):
    
    serializer_class = ClusterSerializer

    def get_queryset(self):
        return Cluster.objects.all()

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
        cluster = Cluster.objects.get(pk=pk)
        query_set = cluster.agents.all()
        agents = AgentSerializer(query_set, many=True)
        return Response({"cluster": ClusterSerializer(cluster).data, "agents": agents.data})
    
    @action(detail=True, methods=['post'])
    def substitute(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        
        quick_cluster = Cluster.objects.get(pk=pk)
        keys = ['name', 'type', 'timer_count', 'timer_term', 'reminder_member_start', 'reminder_owner_start', 'reminder_text', 'expiry']
        for key in keys:
            value = True if request.data[key] == 'true' else False if request.data[key] == 'false' else request.data[key]
            setattr(quick_cluster, key,  value)
        encounter = Encounter.objects.get(id=request.data['encounter'])
        owner = Agent.objects.get(id=request.data['owner'])
        quick_cluster.encounter = encounter
        quick_cluster.owner = owner
        quick_cluster.save()

        placeholder = Cluster.objects.create(name="placeholder", type="system", encounter=encounter)
        placeholder.save()

        return Response({"placeholder": ClusterSerializer(placeholder).data, "quickCluster": ClusterSerializer(quick_cluster).data})
    
    @action(detail=True)
    def agents(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        cluster = Cluster.objects.get(pk=pk)
        agents = cluster.agents.all().values_list('id', flat=True)

        return Response({"agents": agents})

