from django.shortcuts import render, redirect
from psc_social.misc import check_session


# Create your views here.
def dashboard(request):
    if not check_session(session=request.session):
        return redirect('/login')
    return render(request, 'admin/index.html')
