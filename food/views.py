import json
import backbone
from django.shortcuts import render
from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

from .models import Food, Order


def index(request):
    """
    Show the index page.
    """
    return render(request, 'index.html')

def order(request):
    """
    Show the order table.
    """
    return render(request, 'order.html')


@csrf_exempt
def food_api(request):
    """
    Serves test api.
    """
    if request.method == 'POST':
        data = eval(request.raw_post_data.replace('null', 'None'))
        name = data['name']
        price = int(data['price'])
        print name, price
        obj = Food.objects.create(name=name, price=price)
        response = HttpResponse()
        response.status_code = 201
        return response
    else:
        values = json.dumps(list(Food.objects.values()))
        return HttpResponse(values, content_type='application/json')


@csrf_exempt
def get_or_put_food(request, food_id):
    """
    Get or create food with given id.
    """
    try:
        food_item = Food.objects.get(id=food_id)
    except Food.DoesNotExist:
        response.status_code = 404
        print "Unknown object id"
        return response
    if request.method == 'PUT':
        data = eval(request.raw_post_data.replace('null', 'None'))
        food_item.name = data['name']
        food_item.price = data['price']
        food_item.save()
        response = HttpResponse()
        response.status_code = 202
        return response
    elif request.method == 'DELETE':
        food_item.delete()
        response = HttpResponse()
        response.status_code = 204
        return response
    else:
        values = json.dumps(model_to_dict(food_item))
        return HttpResponse(values, content_type='application/json')
        

@csrf_exempt
def list_orders(request):
    """
    Returns existing orders as a list.
    """
    if request.method == 'POST':
        data = eval(request.raw_post_data.replace('null', 'None'))
        name = data['name']
        amount = int(data['amount'])
        print name, amount
        obj = Order.objects.create(name=name, amount=amount)
        data = {'id': obj.id}
        response = HttpResponse(json.dumps(data), content_type='application/json')
        response.status_code = 201
        return response
    else:
        values = eval(serializers.serialize('json', Order.objects.all(),
                fields=('name', 'amount', 'id')))
        for i in values:
            i['fields'].update({'id': i['pk']})
        data = json.dumps([i['fields'] for i in values])
        return HttpResponse(data, content_type='application/json')


@csrf_exempt
def get_or_put_order(request, order_id):
    """
    Get or create food with given id.
    """
    try:
        food_item = Order.objects.get(pk=order_id)
    except Order.DoesNotExist:
        response = HttpResponse()
        response.status_code = 404
        print "Unknown object id"
        return response
    if request.method == 'PUT':
        data = eval(request.raw_post_data.replace('null', 'None'))
        food_item.name = data['name']
        food_item.amount = data['amount']
        food_item.save()
        response = HttpResponse()
        response.status_code = 202
        return response
    elif request.method == 'DELETE':
        food_item.delete()
        response = HttpResponse()
        response.status_code = 204
        return response
    else:
        values = json.dumps(model_to_dict(food_item))
        return HttpResponse(values, content_type='application/json')


def order_ng(request):
    """
    Show the order table.
    """
    return render(request, 'order_ng.html')

#class OrderView(backbone.views.BackboneAPIView):
    #model = Order
    #display_fields = ('name', 'amount')
    #ordering = ('timestamp',)

#backbone.site.register(OrderView)
