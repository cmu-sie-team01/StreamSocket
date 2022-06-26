from rest_framework import serializers
from .models import Profile
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']


class ProfileViewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['bio', 'user', 'followers', 'following']


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['following']


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['followers']

