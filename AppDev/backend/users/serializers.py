import re

from rest_framework import serializers
from .models import User, SMSCode
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken


class CreateUserSerializer(serializers.ModelSerializer):
    sms_code = serializers.CharField(max_length=6, label='SMS Code', write_only=True)
    access = serializers.CharField(label='access', read_only=True)
    refresh = serializers.CharField(label='refresh', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'mobile', 'sms_code', 'access', 'refresh']
        extra_kwargs = {
            'password': {
                'write_only': True,
            }
        }

        # def validate_mobile(self, value):
        #     print(type(value))
        #     if not re.match(r'^\d{9}$', str(value)):
        #         raise serializers.ValidationError('phone number format is wrong')
        #     return value

    def validate(self, attrs):
        real_sms_code = SMSCode.objects.filter(pk=attrs['mobile'])[0]
        if real_sms_code is None:
            raise serializers.ValidationError('verification code is invalid')
        if attrs['sms_code'] != real_sms_code.sms_code_number:
            raise serializers.ValidationError('verification code is wrong')
        if real_sms_code.exp_time < timezone.now():
            raise serializers.ValidationError('verification code is expired')
        return attrs

    def create(self, validated_data):
        del validated_data['sms_code']

        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # encrypt paasword before add to user
        user.save()

        refresh = RefreshToken.for_user(user)
        user.access = str(refresh.access_token)
        user.refresh = str(refresh)

        return user
