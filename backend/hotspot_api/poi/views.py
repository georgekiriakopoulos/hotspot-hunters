from rest_framework import generics
import pandas as pd
from rest_framework.response import Response
from .serializers import PoiUploadSerializer
from .models import PointOfInterest
from rest_framework import status


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