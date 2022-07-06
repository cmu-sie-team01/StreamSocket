# from django.db import models
#
# class Document(models.Model):
#     uploaded_at = models.DateTimeField(auto_now_add=True)
#     upload = models.FileField()

from django.db import models
from profiles.models import Profile
from django.conf import settings


class Video(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    video = models.URLField(unique=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='likes', blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.video)

    class Meta:
        db_table = 'tb_videos'
        ordering = ('-created',)