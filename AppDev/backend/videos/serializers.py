from rest_framework import serializers
from .models import Video


class VideoUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'



class VideoLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
