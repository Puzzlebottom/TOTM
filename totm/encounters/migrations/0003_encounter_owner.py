# Generated by Django 4.1.6 on 2023-02-08 16:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('encounters', '0002_alter_encounter_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='encounter',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='encounters', to=settings.AUTH_USER_MODEL),
        ),
    ]
