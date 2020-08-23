from django.urls import path, include
from .api import *
from knox import views as knox_views


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/teacher/register', TeacherRegisterApi.as_view()),
    path('api/auth/student/register', StudentRegisterApi.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserApi.as_view()),
    path('api/auth/profile', ProfileApi.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout"),
]
