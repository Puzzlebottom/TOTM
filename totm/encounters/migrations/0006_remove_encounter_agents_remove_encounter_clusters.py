# Generated by Django 4.1.6 on 2023-02-12 18:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('encounters', '0005_alter_encounter_agents_alter_encounter_clusters'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='encounter',
            name='agents',
        ),
        migrations.RemoveField(
            model_name='encounter',
            name='clusters',
        ),
    ]
