# Generated by Django 4.1.6 on 2023-03-08 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0011_alter_agent_name_alter_agent_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agent',
            name='armor_class',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='attack_bonus',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='cha_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='con_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='dex_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='hit_points',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='initiative',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='int_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='max_hit_points',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='passive_insight',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='passive_investigation',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='passive_perception',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='spell_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='str_save',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='wis_save',
            field=models.IntegerField(null=True),
        ),
    ]
