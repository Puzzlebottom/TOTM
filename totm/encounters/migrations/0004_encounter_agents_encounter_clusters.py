# Generated by Django 4.1.6 on 2023-02-11 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clusters', '0001_initial'),
        ('agents', '0002_agent_clusters'),
        ('encounters', '0003_encounter_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='encounter',
            name='agents',
            field=models.ManyToManyField(to='agents.agent'),
        ),
        migrations.AddField(
            model_name='encounter',
            name='clusters',
            field=models.ManyToManyField(to='clusters.cluster'),
        ),
    ]
