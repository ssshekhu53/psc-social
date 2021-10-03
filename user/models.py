from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100, null=False)
    username = models.CharField(max_length=100, null=False, unique=True)
    email = models.CharField(max_length=100, null=False, unique=True)
    password = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=10, null=True)
    verified = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)


class TokenVerification(models.Model):
    param = models.CharField(max_length=100, null=False)
    token = models.CharField(max_length=100, null=False)
    createdAt = models.DateTimeField(auto_now=True)