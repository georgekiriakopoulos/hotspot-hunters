from django.shortcuts import render
from rest_framework import generics
import io, csv, pandas as pd
from rest_framework.response import Response
from .serializers import FileUploadSerializer
from .models import PointOfInterest
from rest_framework import status


class UploadFileView(generics.CreateAPIView):
    serializer_class = FileUploadSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        reader = pd.read_csv(file)
        for _, row in reader.iterrows():   
            print(row)
            # new_poi = PointOfInterest(
            #            id = row['id'],
            #            staff_name= row["Staff Name"],
            #            position= row['Designated Position'],
            #            age= row["Age"],
            #            year_joined= row["Year Joined"]
            #            )
            # new_poi.save()
        return Response({"status": "success"},status.HTTP_201_CREATED)