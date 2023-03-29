from encounters.models import Encounter
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .serializers import EncounterSerializer
from agents.models import Agent
from agents.serializers import AgentSerializer
from clusters.models import Cluster
from clusters.serializers import ClusterSerializer
from .default_clusters import default_clusters
import json
import copy
import functools
from rest_framework.renderers import JSONRenderer

class EncounterViewSet(viewsets.ModelViewSet):
    
    serializer_class = EncounterSerializer

    def get_queryset(self):
        return self.request.user.encounters.all() 

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        clusters = copy.deepcopy(default_clusters)
        pk = serializer.data["id"]
        print(pk)
        encounter = Encounter.objects.get(pk = pk)
        for cluster in clusters:
            cluster.encounter = encounter
            clusterSerializer = ClusterSerializer(cluster, data={"name": cluster.name, "type": cluster.type, "encounter": cluster.encounter})
            clusterSerializer.is_valid(raise_exception=True)
            clusterSerializer.save()
        return Response(serializer.data)

    @action(detail=True)
    def select(self, request, *args, **kwargs):
        pk = self.kwargs["pk"]
        encounter = EncounterSerializer(Encounter.objects.get(pk = pk)).data
        encounterAgents = AgentSerializer(Agent.objects.filter(encounter = pk), many=True).data
        encounterClusters = ClusterSerializer(Cluster.objects.filter(encounter = pk), many=True).data
        return Response({"encounter": encounter, "encounterAgents": encounterAgents, "encounterClusters": encounterClusters})
    
    @action(detail=True)
    def run(self, request, *args, **kwargs):
        pk = self.kwargs["pk"]
        encounter = EncounterSerializer(Encounter.objects.get(pk = pk)).data
        encounterAgents = AgentSerializer(Agent.objects.filter(encounter = pk), many=True).data
        clusters = Cluster.objects.filter(encounter = pk)
        encounterClusters = ClusterSerializer(Cluster.objects.filter(encounter = pk), many=True).data
        clusterAgentLookup = []
        
        for cluster in clusters:
            agents = cluster.agents.all().values_list('id', flat=True)
            clusterAgentLookup.append({"clusterId": cluster.id, "agentIds": agents})

        def compareType(x, y):
            order = {"character": 0, "monster": 1, "npc": 1, "event" : 1}
            return order[x["type"]] - order[y["type"]]
        
        agents = json.loads(JSONRenderer().render(encounterAgents).decode('utf-8'))

        s1 = sorted(agents, key=lambda x: (x["name"], x["id"]))
        s2 = sorted(s1, key=functools.cmp_to_key(compareType))
        s3 = sorted(s2, key=lambda x: (x["initiative"], x["initiative_bonus"]), reverse=True)
        
        turnIndex = encounter.get('turn') - 1
        activeAgent = s3[turnIndex]
        activeAgentClusters = ClusterSerializer(Agent.objects.get(pk = activeAgent["id"]).clusters, many=True).data
        placeholder = ClusterSerializer(Cluster.objects.get(name = "placeholder", type = "system", encounter = encounter['id'])).data
        return Response({"encounter": encounter, "encounterAgents": encounterAgents, "encounterClusters": encounterClusters, "activeAgent": activeAgent, "activeAgentClusters": activeAgentClusters, "placeholder": placeholder, "clusterAgentLookup": clusterAgentLookup}, status=200)

    @action(detail=True, methods=["post"])
    def cluster_agent(self, request, pk=None):
        agent = Agent.objects.get(id = self.request.data['agent'])
        cluster = Cluster.objects.get(id = self.request.data['cluster'])
        if (agent.clusters.filter(id = cluster.id)): 
            agent.clusters.remove(cluster)
            action = "removed from"
        else :
            agent.clusters.add(cluster)
            action = "added to"
        return Response({"agent": AgentSerializer(agent).data, "cluster": ClusterSerializer(cluster).data, "action": action}, status=200)

    @action(detail=True, methods=["post"])
    def auto_cluster(self, request, *args, **kwargs):
        pk = self.kwargs["pk"]
        encounter = Encounter.objects.get(pk = pk)
        agent = Agent.objects.get(id = self.request.data['agentId'])
        if (agent.type == "character"):
            cluster = Cluster.objects.get(encounter = encounter.id, name = "Heroes")
        elif (agent.type == "monster"):
            cluster = Cluster.objects.get(encounter = encounter.id, name = "Enemies")
        agent.clusters.add(cluster)
        return Response({"agent": AgentSerializer(agent).data, "cluster": ClusterSerializer(cluster).data, "action": "added"}, status=200)

        
