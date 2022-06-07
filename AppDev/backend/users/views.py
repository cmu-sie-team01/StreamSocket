import datetime

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from random import randint
from .models import SMSCode
from django.utils import timezone
from twilio.rest import Client


# Create your views here.
class SMSCodeView(APIView):
    # text message auth code
    def get(self, request, mobile):
        sms_code_number = '%06d' % randint(0, 999999)
        sms_code = SMSCode.create(mobile, timezone.now() + datetime.timedelta(seconds=60), sms_code_number)
        sms_code.save()

        account_sid = 'ACb4f3e13fdb86bd9a472d141ed68bf90e'
        auth_token = 'ccc3ba984e1f902ba403454f51a04769'
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            body=f'[StreamSocket]Your verification code is {sms_code_number} and is valid for 60 seconds.',
            from_='+18644289731',
            to=f'+1{mobile}'
        )

        print(message.sid)
        return Response({'message': 'ok'})
