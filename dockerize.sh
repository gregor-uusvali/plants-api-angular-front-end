#!/bin/bash
docker build -t my-ang-app .
docker run -d -p 8080:80 my-ang-app