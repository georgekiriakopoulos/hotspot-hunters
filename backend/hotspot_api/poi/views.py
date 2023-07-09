from ast import literal_eval
import json
from django.db.models import Q
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

class SearchPoiView(APIView):
    def get(self, request):
        start = request.data.get('start')
        count = request.data.get('count')
        text = request.data.get('text')
        filters = request.data.get('filters')

        if filters is not None:
            try:
                filters = json.loads(filters)
            except json.JSONDecodeError:
                try:
                    filters = literal_eval(filters)
                except (ValueError, SyntaxError, TypeError):
                    filters = None

        print(filters)

        if filters is not None:
            distance = filters.get('distance')
            keywords = filters.get('keywords')
            categories = filters.get('categories')

            pois = PointOfInterest.objects.all() 

            if distance:
                lat = distance.get('lat')
                lon = distance.get('lon')
                km = distance.get('km')
                min_lat = lat - km
                max_lat = lat + km
                min_lon = lon - km
                max_lon = lon + km
                pois = pois.filter(latitude__range=(min_lat, max_lat), longitude__range=(min_lon, max_lon))

            if keywords:
                pois = pois.filter(Q(district__icontains=keywords) | Q(description__icontains=keywords))

            if categories:
                pois = pois.filter(category__in=categories)
        else:
            pois = PointOfInterest.objects.all()
        
        serializer_class = PointOfInterestSerializer
        serializer = PointOfInterestSerializer(pois, many=True)
        response_data = {
            'start': start,
            'count': count,
            'total': pois.count(),
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
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
        
        user = User.objects.get(pk=user_id)
        
        Circle.objects.get_or_create(user=user, latitude=payload['latitude'], longitude=payload['longitude']) 
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



