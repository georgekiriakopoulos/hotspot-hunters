#!/bin/bash

build_frontend() {
    echo "Building frontend..."
    cd front-end
    npm install
    npm run build
    npm start
}

echo "Starting frontend build..."
build_frontend &
wait