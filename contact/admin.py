from django.contrib import admin
from .models import Enquiries


@admin.register(Enquiries)
class EnquiriesAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'message')
