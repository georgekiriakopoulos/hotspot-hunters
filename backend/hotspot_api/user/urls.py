from django.urls import path 
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('user/register/', views.RegisterView.as_view() , name='user-register'),
    path('user/<int:pk>/', views.UserDetailView.as_view() , name='user-detail'),
    path('user/', views.UserListView.as_view() , name='user-list'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]