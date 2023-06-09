# Generated by Django 4.1.6 on 2023-03-01 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('encounters', '0007_encounter_isactive'),
    ]

    operations = [
        migrations.RenameField(
            model_name='encounter',
            old_name='isActive',
            new_name='is_active',
        ),
        migrations.AddField(
            model_name='encounter',
            name='round',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='encounter',
            name='turn_index',
            field=models.IntegerField(default=1),
        ),
    ]
