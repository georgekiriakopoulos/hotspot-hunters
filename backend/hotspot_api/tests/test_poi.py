# test_upload_poi_view_unit.py

import pytest
from rest_framework import status
from io import StringIO
from poi.models import PointOfInterest
from django.urls import reverse


@pytest.mark.django_db
def test_poi_creation(api_client):
    # Create a test CSV file with valid data
    file_data = "id,perigrafh,dhmos,lat,lon,peripherei,nomarchia\n1,Test Point,Test Description,1.23,4.56,Test Category,Test District"

    # Create a readable file-like object from the file data string
    file_obj = StringIO(file_data)

    response = api_client.post(reverse('upload-poi'), {'file': file_obj}, format='multipart')

    assert response.status_code == status.HTTP_201_CREATED

    # Verify that a PointOfInterest object has been created
    assert PointOfInterest.objects.count() == 1
    # Verify that the PointOfInterest object has the correct attributes
    poi = PointOfInterest.objects.first()
    assert poi.title == 'Test Point'
    assert poi.description == 'Test Description'

