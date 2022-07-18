from django.urls import path
from . import views

app_name = 'profiles'

urlpatterns = [
    path('follower/follow/<int:following>/', views.FollowView.as_view()),
    path('follower/unfollow/<int:following>/', views.UnfollowView.as_view()),
    path('profile/', views.ProfileView.as_view()),
    path('followers/', views.FollowerView().as_view()),
    path('followings/', views.FollowingView().as_view()),
]

"""
url: follower/<int:following>/
method: post
description: used to follow somebody, following is somebody's user id

url: follower/<int:following>/
method: delete
description: used to unfollow somebody, following is somebody's user id

url: followers/
method: get
description: used to get all the followers of current user

url: followings/
method: get
description: used to get all the followings of current user
"""