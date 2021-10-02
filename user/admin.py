from django.contrib import admin
from .models import User, TokenVerification


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'name', 'phone', 'createdAt')


@admin.register(TokenVerification)
class TokenVerificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'param', 'token', 'createdAt')