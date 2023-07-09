from rest_framework import generics
import pandas as pd
from rest_framework.response import Response
from .serializers import PoiUploadSerializer
from .serializers import PointOfInterestSerializer
from .serializers import PoiCircleSerializer 
from .models import PointOfInterest, Category, Circle 
from rest_framework import status
from rest_framework.views import APIView
from user.models import User     


class UploadPoiView(generics.CreateAPIView):
    serializer_class = PoiUploadSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        reader = pd.read_csv(file, encoding_errors='ignore')
        for _, row in reader.iterrows():   
            category = Category.objects.get_or_create(name=row['peripherei'])
            new_poi = PointOfInterest(
                        id = row['id'],
                        title = row['perigrafh'],
                        description = row['dhmos'],
                        latitude = row['lat'],
                        longitude = row['lon'],
                        category = category[0],
                        district = row['nomarchia']
            )
            new_poi.save()
        return Response("Successfully created new PointsofInterest.",status.HTTP_201_CREATED)
    
class PoiView(generics.ListAPIView):
    serializer_class = PointOfInterestSerializer
    queryset = PointOfInterest.objects.all()
    
    def get(self, request):
        queryset = self.get_queryset()
        serializer = PointOfInterestSerializer(queryset, many=True)
        return Response(serializer.data)
    
class PoiDetailView(APIView):
    def get(self, request, pk):
        poi = PointOfInterest.objects.get(pk=pk)
        serializer = PointOfInterestSerializer(poi)
        return Response(serializer.data)
    
    def put(self, request, pk):
        poi = PointOfInterest.objects.get(pk=pk)
        serializer = PoiUploadSerializer(poi, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def delete(self, request, pk):
        poi = PointOfInterest.objects.get(pk=pk)
        poi.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PoiCircleView(APIView):
    serializer_class = PoiCircleSerializer

    def post(self, request):
        payload = request.data
        serializer = self.serializer_class(data=payload)
        serializer.is_valid(raise_exception=True)
        
        user_id = serializer.validated_data['user_id']
        poi_id = serializer.validated_data['poi_id']
        
        user = User.objects.get(pk=user_id)
        poi = PointOfInterest.objects.get(pk=poi_id)
        
        Circle.objects.get_or_create(poi=poi, user=user) 
        return Response(status=status.HTTP_201_CREATED)

    
class PoiCircleListView(APIView):
    serializer_class = PoiCircleSerializer

    def get(self, request):
        queryset = Circle.objects.all()
        serializer = PoiCircleSerializer(queryset, many=True)
        return Response(serializer.data)

class CircleByUserIdView(generics.ListAPIView):
    serializer_class = PoiCircleSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        queryset = Circle.objects.filter(user_id=user_id)
        return queryset

class PoiCircleDetail(APIView):
    serializer_class = PoiCircleSerializer

    def get(self, request, pk):
        queryset = Circle.objects.filter(user=pk)
        serializer = PoiCircleSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        queryset = Circle.objects.filter(user=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



