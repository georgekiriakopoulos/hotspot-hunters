# Generated by Django 4.2.1 on 2023-07-09 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poi', '0007_circle'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='circle',
            name='poi',
        ),
        migrations.AddField(
            model_name='circle',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='circle',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
    ]
