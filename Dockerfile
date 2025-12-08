# Start from a PHP base image
FROM php:8.3-fpm-alpine

# Install necessary extensions (e.g., pdo_mysql)
RUN apk add --no-cache \
    mysql-client \
    php8-pdo_mysql \
    php8-ctype \
    php8-curl \
    php8-dom \
    php8-mbstring \
    php8-xml \
    # Install Node.js for Vite/npm build
    nodejs \
    npm

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Copy application code
WORKDIR /var/www/html
COPY . .

# Run Composer installation
RUN composer install --no-dev

# Run Node/Vite build
RUN npm install
RUN npm run build

# Use a production-ready server (e.g., Caddy or Nginx/Apache) for the final runtime
# ... (This part depends on your exact setup, but the Docker option gives you control)
