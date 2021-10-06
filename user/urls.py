from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('register/', register_user, name='signup'),
    path('do-login/', do_login, name='do_login'),
    path('request-reset-link/', send_reset_link, name='request_reset_link'),
    path('reset-password/', reset_password, name='reset_password'),
    path('confirm-email', verify_email, name='verify_email'),
]