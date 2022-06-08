import datetime
import os

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from random import randint
from .models import SMSCode
from django.utils import timezone
from twilio.rest import Client
from dotenv import load_dotenv


# Create your views here.
class SMSCodeView(APIView):
    # text message auth code
    def get(self, request, mobile):
        sms_code_number = '%06d' % randint(0, 999999)
        sms_code = SMSCode.create(mobile, timezone.now() + datetime.timedelta(seconds=60), sms_code_number)
        sms_code.save()

        load_dotenv()
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            body=f'[StreamSocket]Your verification code is {sms_code_number} and is valid for 60 seconds.',
            from_='+18644289731',
            to=f'+1{mobile}'
        )

        print(message.sid)
        return Response({'message': 'ok'})
