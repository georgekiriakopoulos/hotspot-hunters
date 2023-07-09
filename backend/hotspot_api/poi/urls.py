from django.urls import path 
from . import views


urlpatterns = [
    path('upload/', views.UploadPoiView.as_view(), name='upload-poi'),
    path('poi/', views.PoiView.as_view(), name='poi'),
    path('poi/<int:pk>/', views.PoiDetailView.as_view(), name='poi-detail'),
    path('poi/circle/', views.PoiCircleView.as_view(), name='circle'), 
    path('poi/circle/list/', views.PoiCircleListView.as_view(), name='circle-list'),
    path('poi/circle/<int:pk>/', views.PoiCircleDetail.as_view(), name='circle-detail'),
    path('poi/circles/<int:user_id>/', views.CircleByUserIdView.as_view(), name='circles-by-user-id'),
]