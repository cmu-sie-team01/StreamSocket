from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    mobile = models.BigIntegerField(unique=True, verbose_name='Mobile Number')

    class Meta:
        db_table = 'tb_users'
        verbose_name = 'User'


class SMSCode(models.Model):
    mobile_number = models.BigIntegerField(primary_key=True)
    exp_time = models.DateTimeField()
    sms_code_number = models.CharField(max_length=6)

    @classmethod
    def create(cls, mobile_number, exp_time, sms_code_number):
        sms_code = cls(mobile_number=mobile_number, exp_time=exp_time, sms_code_number=sms_code_number)
        return sms_code

    class Meta:
        db_table = 'tb_sms_code'
        verbose_name = 'SMS code'

