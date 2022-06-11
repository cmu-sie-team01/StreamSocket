import datetime
import os

from django.contrib.auth.backends import ModelBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from random import randint
from .models import SMSCode, User
from django.utils import timezone
from twilio.rest import Client
from dotenv import load_dotenv
from .serializers import CreateUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.
class SMSCodeView(APIView):
    # text message auth code
    def get(self, request, mobile):
        sms_code_number = '%06d' % randint(0, 999999)
        print(sms_code_number)

        sms_code = SMSCode.create(mobile, timezone.now() + datetime.timedelta(seconds=300), sms_code_number)
        sms_code.save()

        load_dotenv()
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            body=f'[StreamSocket]Your verification code is {sms_code_number} and is valid for 5 minutes.',
            from_='+18644289731',
            to=f'+1{mobile}'
        )

        return Response({'message': 'ok'})


class UserView(CreateAPIView):
    serializer_class = CreateUserSerializer


class UsernameExistedView(APIView):
    def get(self, request, username):
        is_existed = User.objects.filter(username=username).exists()
        data = {
            'username': username,
            'is_existed': is_existed
        }
        return Response(data)


class MobileExistedView(APIView):
    def get(self, request, mobile):
        is_existed = User.objects.filter(mobile=mobile).exists()
        data = {
            'mobile': mobile,
            'is_existed': is_existed
        }
        return Response(data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# def get_user_by_username_or_mobile(account):
#
#
#
# class UsernameMobileAuthBackend(ModelBackend):
#     def authenticate(self, request, username=None, password=None, **kwargs):
