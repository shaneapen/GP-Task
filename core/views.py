# core/views.py

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from social_django.models import UserSocialAuth

# Create your views here.
def login(request):
  return render(request, 'login.html')

@login_required
def home(request):
  # response = render(request, 'home.html')

  response = render(request,"build/index.html")
  # currentUser = UserSocialAuth.objects.get(id = request.user.id)
  # response.set_cookie('access_token', currentUser.extra_data['access_token'])
  # response.set_cookie('uid', currentUser.uid)
  return response