from django.db import models
from django.contrib import admin


class User(models.Model):
    name = models.CharField(max_length=100, null=False)
    email = models.CharField(max_length=100, null=False, unique=True)
    password = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=10, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

