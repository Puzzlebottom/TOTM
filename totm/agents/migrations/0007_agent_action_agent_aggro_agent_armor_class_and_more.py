# Generated by Django 4.1.6 on 2023-03-08 14:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0006_remove_agent_clusters'),
    ]

    operations = [
        migrations.AddField(
            model_name='agent',
            name='action',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='aggro',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='agents.agent'),
        ),
        migrations.AddField(
            model_name='agent',
            name='armor_class',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='attack_bonus',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='bonus',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='exclamation',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='free',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='hit_points',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='max_hit_points',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='move',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='notes',
            field=models.CharField(max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='passives',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='reaction',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='saves',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='spell_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='initiative_bonus',
            field=models.IntegerField(default=0),
        ),
    ]
