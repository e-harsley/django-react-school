# Generated by Django 3.0.7 on 2020-08-19 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0009_auto_20200809_2104'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='cover_art',
            field=models.ImageField(blank=True, upload_to='images/%Y/%m/%d/'),
        ),
    ]
