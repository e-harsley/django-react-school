from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.conf import settings

# Create your models here.

class CustomUser(AbstractUser):
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    objects = CustomUserManager()
    location = models.CharField(max_length=250, blank=True)
    bio = models.CharField(max_length=250, blank=True)

class Subject(models.Model):
    name = models.CharField(max_length=30)
    cover_art = models.ImageField(upload_to='images/%Y/%m/%d/', blank=True)

    def __str__(self):
        return self.name

class Teacher(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE, primary_key=True)
    interests = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    @property
    def courses(self):
        return self.courses_set.all()

