from rest_framework import generics
import pandas as pd
from rest_framework.response import Response
from .serializers import PoiUploadSerializer
from .serializers import PointOfInterestSerializer
from .models import PointOfInterest, Category
from rest_framework import status
from rest_framework.views import APIView


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