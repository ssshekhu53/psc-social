from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return render(request, 'index.html')


def login_page(request):
    return render(request, 'login.html')


def signup_page(request):
    return render(request, 'signup.html')

