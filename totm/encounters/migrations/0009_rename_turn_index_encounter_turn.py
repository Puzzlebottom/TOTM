# Generated by Django 4.1.6 on 2023-03-03 16:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('encounters', '0008_rename_isactive_encounter_is_active_encounter_round_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='encounter',
            old_name='turn_index',
            new_name='turn',
        ),
    ]
