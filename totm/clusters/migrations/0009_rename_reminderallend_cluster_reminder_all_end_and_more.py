# Generated by Django 4.1.6 on 2023-03-09 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clusters', '0008_remove_cluster_timers_cluster_expiry_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cluster',
            old_name='reminderAllEnd',
            new_name='reminder_all_end',
        ),
        migrations.RenameField(
            model_name='cluster',
            old_name='reminderAllStart',
            new_name='reminder_all_start',
        ),
        migrations.RenameField(
            model_name='cluster',
            old_name='reminderMemberEnd',
            new_name='reminder_member_end',
        ),
        migrations.RenameField(
            model_name='cluster',
            old_name='reminderMemberStart',
            new_name='reminder_member_mtart',
        ),
        migrations.RenameField(
            model_name='cluster',
            old_name='reminderOwnerEnd',
            new_name='reminder_owner_end',
        ),
        migrations.RenameField(
            model_name='cluster',
            old_name='reminderOwnerStart',
            new_name='reminder_owner_start',
        ),
        migrations.RenameField(
            model_name='cluster',
            old_name='timerCount',
            new_name='timer_count',
        ),
        migrations.RenameField(
            model_name='cluster',
            old_name='timerTerm',
            new_name='timer_term',
        ),
        migrations.RemoveField(
            model_name='cluster',
            name='reminderText',
        ),
        migrations.AddField(
            model_name='cluster',
            name='reminder_text',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]