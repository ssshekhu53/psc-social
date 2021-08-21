from django.shortcuts import render, HttpResponse
from django.core.mail import send_mail
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
        try:
            send_mail(
                subject='PSCSocial: Received your message',
                message='',
                html_message=f'''Hi {name}, <br><br>
            Thank you for messaging us. We will get back to you within a day.<br><br>
            Regards,<br>
            Team PSCSocial''',
                from_email='PSCSocial',
                recipient_list=[email]
            )
        except Exception as e:
            print(e)
            response['mail'] = str(e)
        return HttpResponse(json.dumps(response), content_type="application/json")
    else:
        response['code'] = 500
        response['message'] = 'Enquiry Not Added'
        return HttpResponse(json.dumps(response), content_type="application/json")
