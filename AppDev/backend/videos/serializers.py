from rest_framework import serializers
from .models import Video


class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = ['author', 'video', 'likesCount', 'updated', 'created', 'caption', 'id']
        extra_kwargs = {
            'likesCount': {'read_only': True},
        }
