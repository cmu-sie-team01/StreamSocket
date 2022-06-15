import datetime, os, re
from django.contrib.auth.backends import ModelBackend
from django.utils import timezone
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from random import randint
from .models import VerificationCode, User
from twilio.rest import Client
from dotenv import load_dotenv
from .serializers import CreateUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


def verify_by_mobile(account, code_number):
    load_dotenv()
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=f'[StreamSocket]Your verification code is {code_number} and is valid for 5 minutes.',
        from_='+18644289731',
        to=f'+1{account}'
    )


def verify_by_email(account, code_number):
    email_title = 'Verify your email address with StreamSocket'
    email_body = f'[StreamSocket]Your verification code is {code_number} and is valid for 5 minutes.'
    send_mail(email_title, email_body, 'streamsocket@outlook.com', [account], fail_silently=False)


# Create your views here.
class VerificationsView(APIView):
    # text message auth code
    def get(self, request, account):
        code_number = '%06d' % randint(0, 999999)
        print(code_number)

        verification_code = VerificationCode.create(account, timezone.now() + datetime.timedelta(seconds=300), code_number)
        verification_code.save()

        if re.match(r'\d{10}$', account):
            verify_by_mobile(account, code_number)
        elif re.match(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', account):
            verify_by_email(account, code_number)
        else:
            return Response({'message': 'account is not email or mobile'})

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


class EmailExistedView(APIView):
    def get(self, request, email):
        is_existed = User.objects.filter(email=email).exists()
        data = {
            'email': email,
            'is_existed': is_existed
        }
        return Response(data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        # token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def get_user_by_email_or_mobile(account, password):
    try:
        if re.match(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', account):
            user = User.objects.get(email=account)
            if user.check_password(password):
                return user
        else:
            user = User.objects.get(mobile=account)
            verification_code = VerificationCode.objects.get(account=account)
            if verification_code is None:
                print(1)
                return None
            if verification_code.code_number != password:
                print(2)
                return None
            if verification_code.exp_time < timezone.now():
                print(3)
                return None
            return user
    except User.DoesNotExist:
        print(4)
        return None

    return None


class EmailUsernameAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        user = get_user_by_email_or_mobile(username, password);
        return user
