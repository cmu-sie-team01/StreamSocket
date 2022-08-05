import os
import re
import json
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import VideoSerializer
from .models import Video
from users.models import User
from profiles.models import Profile
from rest_framework.response import Response
from django.core.files.storage import default_storage


def create_json_caption(request):
    print(os.getcwd())
    path = "../../ML/english_transcription/wav2vec2_pipeline/wav2vec2_inference.py"
    outputfile = request.data["video"][71:107]
    print(outputfile)
    ret = os.system(f'python {path} -i {request.data["video"]} -o temp/{outputfile}.srt')
    if ret != 0:
        return None

    regex = r'(?:\d+)\s(\d+:\d+:\d+,\d+) --> (\d+:\d+:\d+,\d+)\s+(.+?)(?:\n\n|$)'
    offset_seconds = lambda ts: sum(
        howmany * sec for howmany, sec in zip(map(int, ts.replace(',', ':').split(':')), [60 * 60, 60, 1, 1e-3]))

    transcript = [
        dict(startTime=offset_seconds(startTime), endTime=offset_seconds(endTime), text=' '.join(ref.split())) for
        startTime, endTime, ref in re.findall(regex, open(f'temp/{outputfile}.srt').read(), re.DOTALL)]

    with open(f'temp/{outputfile}.json', 'w', encoding='utf-8') as f:
        json.dump(transcript, f)

    f = open(f'temp/{outputfile}.json')
    data = json.load(f)
    os.remove(f'temp/{outputfile}.json')
    os.remove(f'temp/{outputfile}.mp4')
    os.remove(f'temp/{outputfile}.srt')
    os.remove(f'temp/{outputfile}.wav')
    return data


class VideoUploadView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id

        # data = create_json_caption(request)
        # request.data['caption'] = data
        # print(data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # os.system(f'python {path} -i {request.data["video"]} -o outputfile.srt')

        # file = default_storage.open('public/storage_test', 'w')
        # file.write('storage contents')
        # file.close()
        data = create_json_caption(request)
        video = Video.objects.get(video = request.data['video'])
        video.caption = data
        video.captionChinese = data
        video.captionSpanish = data
        video.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class VideoDeleteView(RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer
    queryset = Video.objects.all()


class VideoLikeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer

    def put(self, request, pk):
        video = Video.objects.get(id=pk)
        user = User.objects.get(id=request.user.id)

        if user in video.likes.all():
            data = {
                'text': f'the user {user.id} has already liked the video {video.id}',
                'count':f'{video.likesCount}'
            }
            return Response(data)

        video.likes.add(user)
        video.likesCount += 1
        video.save()
        serializer = VideoSerializer(instance=video)
        return Response(serializer.data)


class VideoUnlikeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer

    def put(self, request, pk):
        video = Video.objects.get(id=pk)
        user = User.objects.get(id=request.user.id)

        if user not in video.likes.all():
            data = {
                'text': f'the user {user.id} has not liked the video {video.id} yet',
                'count':f'{video.likesCount}'
            }
            return Response(data)

        video.likes.remove(user)
        video.likesCount -= 1
        video.save()
        serializer = VideoSerializer(instance=video)
        return Response(serializer.data)


class RandomVideoView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer

    def get(self, request):
        randomvideo = Video.objects.order_by('?').first()
        serializer = VideoSerializer(instance=randomvideo)
        if randomvideo is None:
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.data)


class InitialVideoView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer

    def get(self, request):
        randomvideo = Video.objects.order_by('?')[:2]
        serializer = VideoSerializer(instance=randomvideo, many=True)
        if randomvideo is None:
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.data)

class CaptionView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            video = Video.objects.get(id=pk)
        except:
            return Response({'video doesn\'t exist'})
        if video.caption is None:
            return Response({'captions are generating'})
        return Response(video.caption)