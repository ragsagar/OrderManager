from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'AccountManager.views.home', name='home'),
    # url(r'^AccountManager/', include('AccountManager.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'food.views.index', name='home'),
    url(r'^order$', 'food.views.order', name='order_home'),
    url(r'order_ng$', 'food.views.order_ng', name='order_ng'),
    url(r'^food/', include('food.urls')),
)
