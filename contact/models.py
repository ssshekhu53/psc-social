from django.db import models


class Enquiries(models.Model):
    name = models.CharField(max_length=50, null=False)
    email = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=20, null=False)
    message = models.TextField(null=True)
    createAt = models.DateTimeField(auto_now_add=True, blank=True)


