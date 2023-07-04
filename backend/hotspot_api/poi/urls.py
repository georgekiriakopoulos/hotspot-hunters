from django.urls import path 
from . import views


urlpatterns = [
    path('upload/', views.UploadPoiView.as_view(), name='upload-poi'),
    path('poi/', views.PoiView.as_view(), name='poi'),
    path('poi/<int:pk>/', views.PoiDetailView.as_view(), name='poi-detail'),
]