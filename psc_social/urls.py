"""psc_social URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import home, login_page, signup_page, logout, forgot_password_page, reset_password_page, dashboard
from contact import urls as contact_urls
from user import urls as user_urls
from dashboard_custom import urls as dashboard_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('login/', login_page),
    path('signup/', signup_page),
    path('logout/', logout),
    path('forgot-password/', forgot_password_page),
    path('reset-password/', reset_password_page),
    path('dashboard_custom/', dashboard),
    path('enquiries/', include(contact_urls)),
    path('user/', include(user_urls)),
    path('user/dashboard/', include(dashboard_urls)),
]


handler404 = 'psc_social.views.error404'
