from django.urls import path

from . import views

urlpatterns = [
    path('sms_code/<int:mobile>', views.SMSCodeView.as_view()),
]