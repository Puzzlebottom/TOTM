# Generated by Django 4.1.6 on 2023-03-08 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0014_alter_agent_initiative_bonus'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agent',
            name='initiative_bonus',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]