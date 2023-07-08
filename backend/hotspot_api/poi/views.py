from rest_framework import generics
import pandas as pd
from rest_framework.response import Response
from .serializers import PoiUploadSerializer
from .serializers import PointOfInterestSerializer
from .models import PointOfInterest
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
            print(row)
            new_poi = PointOfInterest(
                       id = row['id'],
                       latitude = row['lat'],
                       longitude = row['lon'],
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
    

# class SearchPoisView(APIView):
#     def post(self, request):
#         token = request.headers.get('x-api-token')
#         data = request.data
#         start = data['start']
#         count = data['count']
#         text = data['text']
#         filters = data['filters']

#         # Build the query filters
#         query_filters = {}

#         # Add distance filter
#         distance_filter = filters.get('distance')
#         if distance_filter:
#             lat = distance_filter['lat']
#             lon = distance_filter['lon']
#             km = distance_filter['km']
#             query_filters['location__distance_lte'] = (Point(lon, lat), D(km=km))

#         # Add keywords filter
#         keywords = filters.get('keywords')
#         if keywords:
#             query_filters['name__icontains'] = keywords

#         # Add categories filter
#         categories = filters.get('categories')
#         if categories:
#             query_filters['category__in'] = categories

#         # Perform the search query
#         pois = poi.objects.filter(**query_filters)[start:start + count]
#         total = poi.objects.filter(**query_filters).count()

#         # Serialize the results
#         serializer = PoiSerializer(pois, many=True)

#         # Prepare the response
#         response_data = {
#             'start': start,
#             'count': count,
#             'total': total,
#             'data': serializer.data
#         }

#         return Response(response_data)