from django.db import models
from encounters.models import Encounter
from agents.models import Agent

class Cluster(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    encounter = models.ForeignKey(Encounter, related_name="clusters", on_delete=models.CASCADE, null=True)
    agents = models.ManyToManyField(Agent, related_name="clusters", blank=True)
    owner = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, blank=True)
    timer_count = models.IntegerField(null=True, blank=True)
    timer_term = models.CharField(max_length=16, null=True, blank=True)
    reminder_owner_start = models.BooleanField(null=True, blank=True)
    reminder_member_start = models.BooleanField(null=True, blank=True)
    reminder_all_start = models.BooleanField(null=True, blank=True)
    reminder_round_start = models.BooleanField(null=True, blank=True)
    reminder_owner_end = models.BooleanField(null=True, blank=True)
    reminder_member_end = models.BooleanField(null=True, blank=True)
    reminder_all_end = models.BooleanField(null=True, blank=True)
    reminder_round_end = models.BooleanField(null=True, blank=True)
    reminder_text = models.CharField(max_length=200, null=True, blank=True)
    expiry = models.BooleanField(null=True, blank=True)