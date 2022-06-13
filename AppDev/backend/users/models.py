from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    mobile = models.BigIntegerField(unique=True, verbose_name='Mobile Number', null=True)

    class Meta:
        db_table = 'tb_users'
        verbose_name = 'User'


class VerificationCode(models.Model):
    account = models.CharField(max_length=254, primary_key=True)
    exp_time = models.DateTimeField()
    code_number = models.CharField(max_length=6)

    @classmethod
    def create(cls, account, exp_time, code_number):
        verification_code = cls(account=account, exp_time=exp_time, code_number=code_number)
        return verification_code

    class Meta:
        db_table = 'tb_verification_code'
        verbose_name = 'verification code'
