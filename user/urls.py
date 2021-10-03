from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('register/', register_user, name='signup'),
    path('do-login/', do_login, name='do_login'),
    path('confirm-email', verify_email, name='verify_email'),
]