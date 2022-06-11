from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('sms_codes/<int:mobile>/', views.SMSCodeView.as_view()),
    path('user/', views.UserView.as_view()),
    path('usernames/<str:username>/', views.UsernameExistedView.as_view()),
    path('mobiles/<int:mobile>/', views.MobileExistedView.as_view()),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]