FROM nginx:alpine

# Copy file tĩnh
COPY dist/shopapp_angular /usr/share/nginx/html

# Tạo cấu hình Nginx với cổng 80 cố định
RUN echo 'server { \
    listen 80 default_server; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]