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
  if(request.user.is_authenticated):
    currentUser = UserSocialAuth.objects.get(id = (int(request.user.id)-1)) # -1 because of the weird issue in Django where same user shows two different IDs..need to follow up on the exact cause of issue 
    response = render(request,"build/index.html")
    response.set_cookie('access_token', currentUser.extra_data['access_token'])
    response.set_cookie('uid', currentUser.uid)
    return response
  else:
    return HttpResponse("You're not authenticated")