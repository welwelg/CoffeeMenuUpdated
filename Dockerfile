# Build the frontend assets
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Setup the PHP application
FROM php:8.2-apache
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Configure Apache DocumentRoot to point to public folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . .

# Copy built frontend assets from the build stage
COPY --from=build /app/public/build /var/www/html/public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port (Render sets PORT env var, but Apache default is 80, we need to adjust if needed or just expose 80)
EXPOSE 80

# Handle Render's dynamic PORT if necessary (usually Apache listens on 80 by default inside container, Render routes traffic there)
# But strictly speaking Render adds a PORT env var. Getting Apache to listen on that dynamic port requires a little sed magic at runtime
# or just configuring Render to route external traffic to port 80.
# Render native Docker services usually detect the exposed port or we define it.
# Let's add a script to update the apache port on startup just in case.

CMD sed -i "s/80/$PORT/g" /etc/apache2/sites-enabled/000-default.conf /etc/apache2/ports.conf && php artisan migrate --force && docker-php-entrypoint apache2-foreground
