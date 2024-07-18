import logging
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings

logger = logging.getLogger(__name__)

# Create your views here.

class EverythingNews(APIView):
    def get(self, request):
        url = f'https://newsapi.org/v2/everything?domains=techcrunch.com&apiKey={settings.NEWS_API_KEY}'
        if not settings.NEWS_API_KEY:
            return Response({"error": "API key is not configured."}, status=500)
        response = requests.get(url)
        if response.status_code != 200:
            logger.error("Failed to fetch data from News API: %s %s", response.status_code, response.text)
            return Response({"error": "Failed to fetch data", "status": response.status_code}, status=400)
        
        return Response(response.json())
        
class CategoryNews(APIView):
    def get(self, request, category):
        url = f'https://newsapi.org/v2/top-headlines?country=us&category={category}&apiKey={settings.NEWS_API_KEY}'
        response = requests.get(url)
        if response.status_code == 200:
            return Response(response.json())
        else:
            logger.error(f'Error fetching {category} news')
            return Response({'error': 'Failed to fetch data', 'status': response.status_code}, status=response.status_code)
        