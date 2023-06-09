# Generated by Django 4.1.6 on 2023-02-12 18:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('encounters', '0006_remove_encounter_agents_remove_encounter_clusters'),
        ('agents', '0002_agent_clusters'),
    ]

    operations = [
        migrations.AddField(
            model_name='agent',
            name='encounter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='agents', to='encounters.encounter'),
        ),
    ]
