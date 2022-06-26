from django.urls import path
from . import views

app_name = 'profiles'

urlpatterns = [
    path('follower/<int:following>/', views.FollowView.as_view()),
    path('profile/', views.ProfileView.as_view()),
    path('followers/', views.FollowerView().as_view()),
    path('followings/', views.FollowingView().as_view()),
]