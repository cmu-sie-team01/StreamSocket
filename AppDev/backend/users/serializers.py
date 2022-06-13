import re

from rest_framework import serializers
from .models import User, VerificationCode
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken


class CreateUserSerializer(serializers.ModelSerializer):
    verification_code = serializers.CharField(max_length=6, label='Verification Code', write_only=True)
    access = serializers.CharField(label='access', read_only=True)
    refresh = serializers.CharField(label='refresh', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'mobile', 'verification_code', 'access', 'refresh', 'email']
        extra_kwargs = {
            'password': {'write_only': True},
            'mobile': {'required': False},
            'email': {'required': False},
        }

        # def validate_mobile(self, value):
        #     print(type(value))
        #     if not re.match(r'^\d{9}$', str(value)):
        #         raise serializers.ValidationError('phone number format is wrong')
        #     return value

    def validate(self, attrs):
        if 'mobile' in attrs.keys():
            real_verification_code = VerificationCode.objects.filter(pk=attrs['mobile'])[0]
        elif 'email' in attrs.keys():
            real_verification_code = VerificationCode.objects.filter(pk=attrs['email'])[0]
        else:
            raise serializers.ValidationError('no mobile or email')

        if real_verification_code is None:
            raise serializers.ValidationError('verification code is invalid')
        if attrs['verification_code'] != real_verification_code.code_number:
            raise serializers.ValidationError('verification code is wrong')
        if real_verification_code.exp_time < timezone.now():
            raise serializers.ValidationError('verification code is expired')

        return attrs

    def create(self, validated_data):
        del validated_data['verification_code']

        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # encrypt paasword before add to user
        user.save()

        refresh = RefreshToken.for_user(user)
        user.access = str(refresh.access_token)
        user.refresh = str(refresh)

        return user
