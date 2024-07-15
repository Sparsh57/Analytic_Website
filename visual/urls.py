from django.urls import path, include
from . import views
urlpatterns = [
    path('signup',views.SignupPage,name='signup'),
    path('',views.LoginPage,name='login'),
    path('home/',views.home,name='home'),
    path('logout/',views.LogoutPage,name='logout')
]