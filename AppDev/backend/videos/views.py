# from django.contrib.auth.decorators import login_required
# from django.views.generic.edit import CreateView
# from django.urls import reverse_lazy
#
# from .models import Document
#
#
# class DocumentCreateView(CreateView):
#     model = Document
#     fields = ['upload', ]
#     success_url = reverse_lazy('home')
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         documents = Document.objects.all()
#         context['documents'] = documents
#         return context

# from django.conf import settings
# from django.core.files.storage import FileSystemStorage
from rest_framework import status
from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import VideoUploadSerializer, VideoLikeSerializer
from .models import Video
from users.models import User
from profiles.models import Profile
from rest_framework.response import Response


class VideoUploadView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoUploadSerializer

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class VideoDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    # serializer_class = VideoUploadSerializer
    queryset = Video.objects.all()


class VideoLikeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoLikeSerializer

    def put(self, request):
        video = Video.objects.get(id=request.data['video_id'])
        user = User.objects.get(id=request.user.id)
        video.likes.add(user)
        video.save()
        serializer = VideoLikeSerializer(instance=video)
        return Response(serializer.data)


class VideoUnlikeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoLikeSerializer

    def put(self, request):
        video = Video.objects.get(id=request.data['video_id'])
        user = User.objects.get(id=request.user.id)
        video.likes.remove(user)
        video.save()
        serializer = VideoLikeSerializer(instance=video)
        return Response(serializer.data)



