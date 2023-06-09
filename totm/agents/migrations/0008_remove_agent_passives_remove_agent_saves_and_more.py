# Generated by Django 4.1.6 on 2023-03-08 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0007_agent_action_agent_aggro_agent_armor_class_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='agent',
            name='passives',
        ),
        migrations.RemoveField(
            model_name='agent',
            name='saves',
        ),
        migrations.AddField(
            model_name='agent',
            name='cha_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='con_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='dex_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='int_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='passive_insight',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='passive_investigation',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='passive_perception',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='str_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='agent',
            name='wis_save',
            field=models.IntegerField(null=True),
        ),
    ]
