import re
import uuid

from rest_framework import serializers
from .models import User, VerificationCode
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken


class CreateUserSerializer(serializers.ModelSerializer):
    verification = serializers.CharField(max_length=6, label='Verification Code', write_only=True, required=False)
    access = serializers.CharField(label='access', read_only=True)
    refresh = serializers.CharField(label='refresh', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'mobile', 'access', 'refresh', 'email', 'verification']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'mobile': {'required': False},
            'email': {'required': False},
            'verification': {'required': False},
            'username': {'required': False},
        }

        # def validate_mobile(self, value):
        #     print(type(value))
        #     if not re.match(r'^\d{10}$', str(value)):
        #         raise serializers.ValidationError('phone number format is wrong')
        #     return value

    def validate(self, attrs):
        if 'mobile' in attrs.keys():
            real_verification_code = VerificationCode.objects.filter(pk=attrs['mobile'])[0]
            if real_verification_code is None:
                raise serializers.ValidationError('verification code is invalid')
            if attrs['verification'] != real_verification_code.code_number:
                raise serializers.ValidationError('verification code is wrong')
            if real_verification_code.exp_time < timezone.now():
                raise serializers.ValidationError('verification code is expired')
            if User.objects.filter(mobile=attrs['mobile']).exists():
                raise serializers.ValidationError('mobile is already existed')

        elif 'email' in attrs.keys():
            if User.objects.filter(email=attrs['email']).exists():
                raise serializers.ValidationError('email is already existed')
        else:
            raise serializers.ValidationError('no mobile or email')

        return attrs

    def create(self, validated_data):

        user = User(**validated_data)

        if 'password' in validated_data.keys():
            password = validated_data.pop('password')
            user.set_password(password)  # encrypt paasword before add to user
        elif 'verification' in validated_data.keys():
            user.username = "user" + uuid.uuid3(uuid.NAMESPACE_URL, str(user.mobile)).hex
            del validated_data['verification']

        user.save()

        refresh = RefreshToken.for_user(user)
        user.access = str(refresh.access_token)
        user.refresh = str(refresh)

        return user
