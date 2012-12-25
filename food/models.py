from django.db import models


class Food(models.Model):
    """
    Food items and their prices.
    """
    name = models.CharField(max_length=50)
    price = models.IntegerField()

    def __unicode__(self):
        """
        Provide some object specific info.
        """
        return "%s %s" % (self.name, self.price)


class Order(models.Model):
    """
    To keep track of orders made from hotel.
    """
    timestamp = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50)
    amount = models.IntegerField()
    
