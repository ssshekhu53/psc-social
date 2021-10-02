from django.db import IntegrityError
from django.shortcuts import render, HttpResponse
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .models import User, TokenVerification
from hashlib import md5
import json, datetime


def register_user(request):
    response = {}
    if request.method == 'POST':
        entry = User()
        name = request.POST['name']
        username = request.POST['username']
        email = request.POST['email']
        password = md5(request.POST['password'].encode()).hexdigest()
        try:
            entry.name = name
            entry.email = email
            entry.username = username
            entry.password = password
            entry.save()
            response['code'] = 200
            response['message'] = 'User registered successfully'
            entry = TokenVerification()
            token = md5(str(datetime.datetime.now()).encode()).hexdigest()
            entry.param = email
            entry.token = token
            entry.save()
            host = request.get_host()
            url = 'http://' if '127.0.0.1' in host else 'https://'
            url += f'{ host }/user/confirm-email?param={ email }&token={ token }'
            message = render_to_string('email_templates/signup.html', {'name': name, 'url': url})
            send_mail(
                subject='PSCSocial: Email Verification',
                message='',
                html_message=message,
                from_email='PSCSocial',
                recipient_list=[email]
            )
            response['email'] = {}
            response['email']['code'] = 200
            response['email']['message'] = "Mail sent"
        except IntegrityError as e:
            response['code'] = 500
            response['message'] = "Username already taken" if 'username' in str(e) else "Email already registered"
        except Exception as e:
            response['email'] = {}
            response['email']['code'] = 500
            response['email']['message'] = str(e)
        finally:
            return HttpResponse(json.dumps(response), content_type='application/json')
    else:
        response['code'] = 500
        response['message'] = 'Invalid method'
        return HttpResponse(json.dumps(response), content_type='application/json')


def verify_email(request):
    response = {}
    if 'email' not in request.GET and 'token' not in request.GET:
        response['email'] = request.GET['email']
        response['token'] = request.GET['token']
        return HttpResponse(json.dumps(response), content_type='application/json')
    else:
        response['code'] = 500
        return HttpResponse(json.dumps(response), content_type='application/json')