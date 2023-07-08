# tests.py

import pytest
from user.models import User
from django.contrib.auth import authenticate, login
from django.urls import reverse


@pytest.mark.django_db
def test_user_registration(api_client):
    # Register with no credentials
    data = {}
    response = api_client.get(reverse('user-register'), data=data)
    assert response.status_code == 405

    # Register a new user
    data = {
        'email': 'test@mail.com',
        'password': 'testpassword',
        'password': 'testpassword',
    }
    response = api_client.post(reverse('user-register'), data=data)
    print(response.json()) 

    assert response.status_code == 201  # Successful registration and creation of user
    
    # Verify user has been created
    user = User.objects.get(email='test@mail.com')
    assert user is not None


@pytest.mark.django_db
def test_user_login(api_client):
    # Login with no credentials (fails)
    data = {}
    response = api_client.get(reverse('login'), data=data)
    assert response.status_code == 405

    # Create a test user
    User.objects.create_user(email='testuser@email.com', password='testpassword')

    # Log in the user (successful)
    response = api_client.post(reverse('login'), {
        'email': 'testuser@email.com',
        'password': 'testpassword',
    })
    assert response.status_code == 200  # Successful login

    # Verify user is authenticated
    user = authenticate(email='testuser@email.com', password='testpassword')
    assert user is not None
    assert user.is_authenticated


@pytest.mark.django_db
def test_user_registration_and_login(api_client):
    # Register a new user
    response = api_client.post(reverse('user-register'), {
        'email': 'testuser@email.com',
        'password': 'testpassword',
        'password': 'testpassword',
    })
    assert response.status_code == 201  

    # Log in the user
    response = api_client.post(reverse('login'), {
        'email': 'testuser@email.com',
        'password': 'testpassword',
    })
    assert response.status_code == 200  

    # Verify user is authenticated
    user = authenticate(email='testuser@email.com', password='testpassword')
    assert user is not None
    assert user.is_authenticated
