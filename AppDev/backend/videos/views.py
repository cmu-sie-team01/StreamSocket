from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render

from .models import Upload, UploadPrivate


def video_upload(request):
    if request.method == 'POST':
        video_file = request.FILES['image_file']
        video_type = request.POST['image_type']
        if settings.USE_S3:
            if video_type == 'private':
                upload = UploadPrivate(file=video_file)
            else:
                upload = Upload(file=video_file)
            upload.save()
            image_url = upload.file.url
        else:
            fs = FileSystemStorage()
            filename = fs.save(video_file.name, video_file)
            image_url = fs.url(filename)
        return render(request, 'upload.html', {
            'image_url': image_url
        })
    return render(request, 'upload.html')