from django.contrib import admin
from .models import Feature
from .models import Book

# Register your models here.

admin.site.register(Feature)
admin.site.register(Book)