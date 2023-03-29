from django.db import models
from django.contrib.auth.models import User

class Encounter(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    is_active = models.BooleanField(default=False)
    round = models.IntegerField(default=1)
    turn = models.IntegerField(default=1)
    owner = models.ForeignKey(User, related_name="encounters", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)