# Generated by Django 4.1.6 on 2023-03-08 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0013_alter_agent_armor_class_alter_agent_attack_bonus_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agent',
            name='initiative_bonus',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]