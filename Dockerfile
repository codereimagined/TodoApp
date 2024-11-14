# Stage 1: Use the official Node.js Alpine image as the base image
FROM node:21-alpine3.18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy everything 
# TODO: Improve, takes a long time
COPY . .

# Install the Angular CLI 
RUN npm install -g @angular/cli
# TODO: Shoud we use `npm ci`?
RUN npm i

# Build the Angular app with production configuration
RUN ng build --configuration=production

# Stage 2: Create a new image with a smaller base image (NGINX)
FROM nginx:1.27.2-alpine-slim

# Copy the NGINX configuration file to the appropriate location
COPY reverse_proxy/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
# Copy the built Angular app from the 'calipharma' image to the NGINX HTML directory
COPY --from=build /app/dist/todo-app/browser /usr/share/nginx/html

# Specify the command to run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
