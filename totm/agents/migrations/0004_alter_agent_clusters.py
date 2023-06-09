# Generated by Django 4.1.6 on 2023-02-12 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clusters', '0002_cluster_encounter'),
        ('agents', '0003_agent_encounter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agent',
            name='clusters',
            field=models.ManyToManyField(blank=True, related_name='agents', to='clusters.cluster'),
        ),
    ]
