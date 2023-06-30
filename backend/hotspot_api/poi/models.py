from django.db import models

class PointOfInterest(models.Model):
    timestampAdded = models.DateTimeField(auto_now=False, auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    category = models.ForeignKey('Category', on_delete=models.CASCADE) 



class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)


class Attachment(models.Model):
    file = models.FileField(upload_to='attachments/')
    description = models.TextField(null=True, blank=True)
    timestampAdded = models.DateTimeField(auto_now=False, auto_now_add=True)
    timestampModified = models.DateTimeField(auto_now=True, auto_now_add=False)

