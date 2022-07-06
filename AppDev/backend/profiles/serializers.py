from rest_framework import serializers
from .models import Profile
from users.models import User
from videos.models import Video


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['video','id']


class ProfileViewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    videos_upload = VideoSerializer(read_only=True, many=True)
    videos_like = VideoSerializer(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ['bio', 'user', 'videos_upload', 'videos_like', 'followers', 'following']


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['following']


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['followers']

