from django.shortcuts import render, HttpResponse
from .models import Enquiries
import json


def add_contact(request):
    response = {}
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        phone = request.POST['phone']
        message = request.POST['message']
        entry = Enquiries()
        entry.email = email
        entry.name = name
        entry.phone = phone
        entry.message = message
        entry.save()
        response['code'] = 200
        response['message'] = 'Enquiry Added'
        return HttpResponse(json.dumps(response), content_type="application/json")
    else:
        response['code'] = 500
        response['message'] = 'Enquiry Not Added'
        return HttpResponse(json.dumps(response), content_type="application/json")
