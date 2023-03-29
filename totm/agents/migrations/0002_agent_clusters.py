# Generated by Django 4.1.6 on 2023-02-11 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clusters', '0001_initial'),
        ('agents', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='agent',
            name='clusters',
            field=models.ManyToManyField(related_name='agents', to='clusters.cluster'),
        ),
    ]
