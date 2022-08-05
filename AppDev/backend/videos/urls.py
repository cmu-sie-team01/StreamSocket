from django.urls import path

from . import views

urlpatterns = [
    path('video/', views.VideoUploadView.as_view()),
    path('video/<int:pk>/', views.VideoDeleteView.as_view()),
    path('like/<int:pk>/', views.VideoLikeView.as_view()),
    path('unlike/<int:pk>/', views.VideoUnlikeView.as_view()),
    path('randomvideo/', views.RandomVideoView.as_view()),
    path('initialvideo/', views.InitialVideoView.as_view()),
    path('caption/<int:pk>/', views.CaptionView.as_view()),
]

"""
url: video/
method: post
description: used to upload video url to database
request body:
{
    "video":"video url"
}

url: video/<int:pk>/
method: delete
description: used to delete a video (not the video itself, need to delete the video itself in frontend later)
detail: pk is the video id

url: like/
method: put
description: used to like one video
request body:
{
    "video_id":"video id"
}

url: unlike/
method: put
description: used to unlike one video
request body:
{
    "video_id":"video id"
}
"""