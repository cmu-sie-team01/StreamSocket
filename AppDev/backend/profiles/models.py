from django.db import models
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    following = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='following', blank=True)
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='followers', blank=True)
    bio = models.TextField(default='no bio...')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def profiles_videos(self):
        return self.profile_set.all()

    def __str__(self):
        return str(self.user.username)

    class Meta:
        db_table = 'tb_profiles'
        ordering = ('-created',)
