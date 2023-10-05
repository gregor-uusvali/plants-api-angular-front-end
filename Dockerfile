# FROM node:18-alpine as angular

# WORKDIR /app

# COPY . .

# RUN npm install

# RUN npm run build

# FROM httpd:alpine3.15

# WORKDIR /usr/local/apache2/htdocs
# COPY --from=angular /app/dist/plants-api-angular-front-end .

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# fix the refresh issue
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/plants-api-angular-front-end /usr/share/nginx/html

# Expose port 80
EXPOSE 80
