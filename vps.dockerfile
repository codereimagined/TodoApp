# Stage 2: Create a new image with a smaller base image (NGINX)
FROM nginx:1.27.2-alpine-slim

# Copy the NGINX configuration file to the appropriate location
COPY reverse_proxy/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
# Copy the built Angular app from the 'calipharma' image to the NGINX HTML directory
COPY dist/todo-app/browser /usr/share/nginx/html

# Specify the command to run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
