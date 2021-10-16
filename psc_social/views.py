import datetime

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.db.models import Q
from user.models import User, TokenVerification
from .misc import check_session


def home(request):
    return render(request, 'index.html')


def login_page(request):
    if check_session(session=request.session):
        return redirect('/user/dashboard')
    return render(request, 'login.html')


def signup_page(request):
    if check_session(session=request.session):
        return redirect('/user/dashboard')
    return render(request, 'signup.html')


def logout(request):
    if check_session(session=request.session):
        del request.session['login']
    return redirect('/login')


def forgot_password_page(request):
    if check_session(session=request.session):
        return redirect('/user/dashboard')
    return render(request, 'forgot-password.html')


def reset_password_page(request):
    if check_session(session=request.session):
        return redirect('/user/dashboard')
    response = {}
    if 'param' in request.GET and 'token' in request.GET:
        email = request.GET['param']
        token = request.GET['token']
        try:
            qs = TokenVerification.objects.filter(param=email, token=token)
            if len(qs) == 0:
                raise User.DoesNotExist
            curr_time = datetime.datetime.now().astimezone()
            createdAt = qs[0].createdAt.astimezone()
            time_diff = curr_time - createdAt
            if time_diff.total_seconds() / 60 > 30:
                raise User.DoesNotExist
            qs.delete()
            response['code'] = 200
            response['message'] = "Successfully"
            response['email'] = email
        except User.DoesNotExist as e:
            response['code'] = 404
            response['message'] = "Either the link has expired or is invalid."
        except Exception as e:
            response['code'] = 500
            response['message'] = "We are facing little issue. Comeback after a while."
            print(e)
        finally:
            return render(request, 'reset-password.html', response)
    else:
        return redirect('/login')


def dashboard(request):
    if not check_session(session=request.session):
        return redirect('/login')
    return render(request, 'temp.html')


def error404(request, exception=None):
    return render(request, 'error404.html')