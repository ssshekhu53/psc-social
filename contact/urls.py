from django.urls import path
from .views import add_contact

urlpatterns = [
    path('add-enquiry', add_contact, name='addEnquiry'),
]