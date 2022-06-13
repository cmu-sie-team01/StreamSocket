from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('verifications/<str:account>/', views.VerificationsView.as_view()),   # get verification code
    path('user/', views.UserView.as_view()),    # post a user
    path('usernames/<str:username>/', views.UsernameExistedView.as_view()),  # get whether the username existed
    path('mobiles/<int:mobile>/', views.MobileExistedView.as_view()),   # get whether the mobile existed
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),    # post
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   #
]