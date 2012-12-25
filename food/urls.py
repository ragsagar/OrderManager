from django.conf.urls.defaults import *
from .api import FoodResource

foodresource = FoodResource()

urlpatterns = patterns('',
                #(r'^api/', include(foodresource.urls)),
                (r'^api$', 'food.views.food_api'),
                (r'^api/(?P<food_id>\d{1,2})$',
                  'food.views.get_or_put_food'),
                )
