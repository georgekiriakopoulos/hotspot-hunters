from django.urls import path 
from . import views


urlpatterns = [
    path('upload/', views.UploadPoiView.as_view(), name='upload-poi')
]