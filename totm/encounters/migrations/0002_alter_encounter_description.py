# Generated by Django 4.1.6 on 2023-02-07 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('encounters', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='encounter',
            name='description',
            field=models.TextField(blank=True, max_length=500),
        ),
    ]