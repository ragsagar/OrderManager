from django.conf.urls.defaults import *
from .api import FoodResource

foodresource = FoodResource()

urlpatterns = patterns('',
                (r'^api/', include(foodresource.urls)),
                (r'^test_api/$', 'food.views.test_api'),
                )
