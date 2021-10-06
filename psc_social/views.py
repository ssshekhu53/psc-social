from django.shortcuts import render, redirect
from django.http import HttpResponse
from .misc import check_session


def home(request):
    return render(request, 'index.html')


def login_page(request):
    if check_session(session=request.session):
        return redirect('/dashboard')
    return render(request, 'login.html')


def signup_page(request):
    if check_session(session=request.session):
        return redirect('/dashboard')
    return render(request, 'signup.html')


def logout(request):
    if check_session(session=request.session):
        del request.session['login']
    return redirect('/login')


def dashboard(request):
    if not check_session(session=request.session):
        return redirect('/login')
    return render(request, 'temp.html')


def error404(request, exception=None):
    return render(request, 'error404.html')