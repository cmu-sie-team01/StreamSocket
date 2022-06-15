from django.urls import path

from . import views

urlpatterns = [
    path('video/', views.VideoView.as_view()),
]