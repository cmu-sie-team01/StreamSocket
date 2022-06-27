from django.conf import settings
from django.core.files.storage import FileSystemStorage


def video_upload(request):
    pass
# from django.contrib.auth.decorators import login_required
# from django.views.generic.edit import CreateView
# from django.urls import reverse_lazy
#
# from .models import Document
#
#
# class DocumentCreateView(CreateView):
#     model = Document
#     fields = ['upload', ]
#     success_url = reverse_lazy('home')
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         documents = Document.objects.all()
#         context['documents'] = documents
#         return context