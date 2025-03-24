FROM nginx:alpine
COPY dist/shopapp_angular /usr/share/nginx/html
EXPOSE 80