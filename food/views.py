import json
from django.shortcuts import render
from django.http import HttpResponse
from .models import Food


def index(request):
    """
    Show the index page.
    """
    return render(request, 'index.html')


def test_api(request):
    """
    Serves test api.
    """
    values = json.dumps(list(Food.objects.values()))
    return HttpResponse(values, content_type='application/json')
