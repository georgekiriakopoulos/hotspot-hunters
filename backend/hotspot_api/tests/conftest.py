import sys
import os
import pytest
from rest_framework.test import APIClient

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

@pytest.fixture
def api_client():
    return APIClient()