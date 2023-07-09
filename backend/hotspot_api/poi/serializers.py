from rest_framework import serializers
from .models import PointOfInterest, Circle


class PointOfInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointOfInterest
        fields = "__all__"

class PoiUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    
class SavePoiSerializer(serializers.Serializer):
    class Meta:
        model = PointOfInterest
        fields = "__all__"

class PoiCircleSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    class Meta:
        model = Circle 
        fields = "__all__"