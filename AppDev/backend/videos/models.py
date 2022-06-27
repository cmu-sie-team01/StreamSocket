# from django.db import models
# from profiles.models import Profile
#
#
# class Video(models.Model):
#     author = models.ForeignKey(Profile, on_delete=models.CASCADE)
#     video = models.URLField()
#     updated = models.DateTimeField(auto_now=True)
#     created = models.DateTimeField(auto_now_add=True)
#
#     def __str__(self):
#         return str(self.video)
#
#     class Meta:
#         db_table = 'tb_videos'
#         ordering = ('-created',)

from django.db import models

class Document(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    upload = models.FileField()