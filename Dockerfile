# --- Stage 1: Build the React/Inertia Frontend ---
FROM node:20 as frontend

WORKDIR /app

# Copy package files first to cache dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Build the assets (Vite will output to public/build)
RUN npm run build

# --- Stage 2: Setup the Laravel Backend ---
FROM php:8.2-apache as backend

# 1. Install system tools needed for Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl

# 2. Install PHP extensions (MySQL, Math, Image processing)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 3. Configure Apache to point to Laravel's /public folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# 4. Enable Apache mod_rewrite (Essential for Laravel routing)
RUN a2enmod rewrite

# 5. Set working directory
WORKDIR /var/www/html

# 6. Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 7. Copy backend source code
COPY . .

# 8. Copy the BUILT frontend assets from Stage 1 (The Magic Step)
# This takes the compiled JS/CSS from the Node layer and puts it in the PHP layer
COPY --from=frontend /app/public/build public/build
#COPY --from=frontend /app/public/manifest.json public/manifest.json

# 9. Install PHP Dependencies
RUN composer install --no-dev --optimize-autoloader

# 10. Fix file permissions so Laravel can write logs
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

# <--- ETO YUNG BINAGO NATIN (FULL PATH PARA SIGURADO) --->
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
