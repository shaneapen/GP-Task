# core/views.py

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from social_django.models import UserSocialAuth
from django.http import HttpResponse


# Create your views here.
def login(request):
  return render(request, 'login.html')

@login_required
def home(request):
  return HttpResponse('Request ID: ', request.user,'Authenticated: ', request.user.is_authenticated(), 'User Object': request.user)

  response = render(request,"build/index.html")
  # currentUser = UserSocialAuth.objects.get(id = request.user.id)
  # response.set_cookie('access_token', currentUser.extra_data['access_token'])
  # response.set_cookie('uid', currentUser.uid)
  # return response