#!/bin/bash

build_backend() {
    echo "Building Django backend..."
    cd backend
    virtualenv -p python3.8 env
    source env/bin/activate
    pip install -r requirements.txt
    python ./hotspot_api/manage.py migrate
    python ./hotspot_api/manage.py runserver
}

echo "Starting backend build..."
build_backend &
wait