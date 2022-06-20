from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('verifications/<str:account>/', views.VerificationsView.as_view()),   # get verification code
    path('user/', views.UserView.as_view()),    # post a user
    path('usernames/<str:username>/', views.UsernameExistedView.as_view()),  # get whether the username existed
    path('mobiles/<int:mobile>/', views.MobileExistedView.as_view()),   # get whether the mobile existed
    path('emails/<str:email>/', views.EmailExistedView.as_view()),   # get whether the email existed
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),    # post
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   #
    # path(''),
]

"""
url: verifications/<str:account>/
method: get
description: used to send verification code to specified email or mobile, account is email address or mobile number

url: user/
method: post
description: used to create a user
request body (json):
{
    username
    password
    email or mobile
    verification_code
}

url: usernames/<str:username>/
method: get
description: used to check whether the specified username exists

url: mobiles/<str:mobile>/
method: get
description: used to check whether the specified mobile exists

url: emails/<str:email>/
method: get
description: used to check whether the specified email exists

url: token/
method: post
description: get jwt
request body (json):
{
    "username": email       mobile
    "password": password    verification code
}
"""