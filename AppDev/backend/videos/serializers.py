from rest_framework import serializers
from .models import Video


class VideoUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'video', 'author','likes', 'updated','created','caption']


class VideoLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
