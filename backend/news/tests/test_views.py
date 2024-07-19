# backend/news/tests/test_views.py
import logging
from unittest.mock import patch
from django.conf import settings
from django.test import TestCase, override_settings
from rest_framework.test import APIClient
from rest_framework import status

logger = logging.getLogger(__name__)

class NewsAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()

    @override_settings(NEWS_API_KEY=None)
    def test_everything_news_no_api_key(self):
        response = self.client.get('/everything/')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, {"error": "API key is not configured."})

    @patch('news.views.requests.get')
    def test_everything_news_success(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {"articles": [{"title": "Test Article"}]}

        response = self.client.get('/everything/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"articles": [{"title": "Test Article"}]})

    @patch('news.views.requests.get')
    def test_everything_news_failure(self, mock_get):
        mock_get.return_value.status_code = 400
        mock_get.return_value.text = "Bad Request"

        response = self.client.get('/everything/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Failed to fetch data", "status": 400})

    @patch('news.views.requests.get')
    def test_category_news_success(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {"articles": [{"title": "Test Technology Article"}]}

        response = self.client.get('/category/technology/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"articles": [{"title": "Test Technology Article"}]})

    @patch('news.views.requests.get')
    def test_category_news_failure(self, mock_get):
        mock_get.return_value.status_code = 400
        mock_get.return_value.text = "Bad Request"

        response = self.client.get('/category/technology/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'Failed to fetch data', 'status': 400})
