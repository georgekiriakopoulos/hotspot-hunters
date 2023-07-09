from django.db import models

class PointOfInterest(models.Model):
    timestampAdded = models.DateTimeField(auto_now=False, auto_now_add=True, null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, null=True, blank=True) 
    district = models.CharField(max_length=255, null=True, blank=True) 


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True, null=True, blank=True)


class Circle(models.Model):
    id = models.AutoField(primary_key=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True, blank=True)  
    radius = models.IntegerField(null=True, blank=True, default=10000)
