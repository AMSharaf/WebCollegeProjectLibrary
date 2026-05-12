from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Feature(models.Model):
    name=models.CharField(max_length=100)
    details=models.CharField(max_length=500)

class Book(models.Model):
    
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=150)
    category = models.CharField(max_length=100)
    details=models.CharField(max_length=500)

    price = models.DecimalField(max_digits=10,decimal_places=2)

    is_borrowed = models.BooleanField(default=False)
    borrowed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.title} by {self.author}"
    
