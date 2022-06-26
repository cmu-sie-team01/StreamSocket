from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import ProfileViewSerializer, FollowingSerializer, FollowerSerializer
from .models import Profile
from users.models import User
from rest_framework.response import Response


class FollowView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, following):
        my_profile = Profile.objects.get(user_id=request.user.id)
        following_profile = Profile.objects.get(user_id=following)
        following_user = User.objects.get(id=following)
        my_profile.following.add(following_user)
        following_profile.followers.add(request.user)
        data = {
            'message': 'ok',
        }
        return Response(data)

    def delete(self, request, following):
        my_profile = Profile.objects.get(user_id=request.user.id)
        following_profile = Profile.objects.get(user_id=following)
        following_user = User.objects.get(id=following)
        my_profile.following.remove(following_user)
        following_profile.followers.remove(request.user)
        data = {
            'message': 'ok',
        }
        return Response(data)


class ProfileView(RetrieveAPIView):
    serializer_class = ProfileViewSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile = Profile.objects.get(user_id=self.request.user.id)
        return profile


class FollowerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user_id=self.request.user.id)
        serializer = FollowerSerializer(instance=profile)
        return Response(serializer.data)


class FollowingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user_id=self.request.user.id)
        serializer = FollowingSerializer(instance=profile)
        return Response(serializer.data)

