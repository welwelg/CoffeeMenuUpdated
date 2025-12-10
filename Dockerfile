# Stage 1: build frontend
FROM node:20-alpine as frontend

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: build backend
FROM php:8.3-fpm

# Install PHP extensions
RUN apt-get update && apt-get install -y \
    git zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy frontend build
COPY --from=frontend /app/public/build ./public/build

# Copy environment file
RUN cp .env.example .env

# Generate app key
RUN php artisan key:generate

CMD php artisan serve --host=0.0.0.0 --port=$PORT
