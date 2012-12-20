from django.db import models


class Food(models.Model):
    """
    Food items and their prices.
    """
    name = models.CharField(max_length=50)
    price = models.IntegerField()
