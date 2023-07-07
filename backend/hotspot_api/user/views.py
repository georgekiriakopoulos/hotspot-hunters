from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from django.contrib.auth.password_validation import validate_password
from .models import User
from .serializers import UserSerializer

class RegisterView(APIView):
  serializer_class = UserSerializer

  def post(self, request):
    serializer = self.serializer_class(data=request.data)
    serializer.is_valid(raise_exception=True)
    validated_password1 = validate_password(serializer.validated_data.get('password'))
    validated_password2 = serializer.validated_data.get('password2')
    if validated_password1 != validated_password2:
      return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    User.objects.create_user(**serializer.validated_data) 
    return Response("User Successfully created!", status=status.HTTP_201_CREATED)



class UserListView(APIView):
  serializer_class = UserSerializer

  def get(self, request):
    users = User.objects.all()
    serializer = self.serializer_class(users, many=True)
    return Response(serializer.data)



class UserDetailView(APIView):
  serializer_class = UserSerializer

  def get(self, request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer = self.serializer_class(user)
    return Response(serializer.data)

  def patch(self, request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer = self.serializer_class(data=request.data, partial=True) 
    serializer.is_valid(raise_exception=True)
    serializer.update(user, serializer.validated_data)  
    data = self.serializer_class(user, many=False).data
    return Response(data, status=status.HTTP_200_OK)
  
  def delete(self, request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response("User Successfully deleted!", status=status.HTTP_204_NO_CONTENT)

    
