from django.urls import path

from . import views

urlpatterns = [
    path('video/', views.VideoUploadView.as_view()),
    path('video/<int:pk>/', views.VideoDeleteView.as_view()),
    path('like/', views.VideoLikeView.as_view()),
]