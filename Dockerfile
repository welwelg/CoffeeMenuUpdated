# 1. Base Image: Start with an image that has PHP, FPM, and Composer support.
FROM php:8.3-fpm-alpine

# 2. Install Dependencies: Install necessary PHP extensions and system libraries.
RUN apk add --no-cache \
    mysql-client \
    php8-pdo_mysql \
    php8-ctype \
    php8-curl \
    php8-dom \
    php8-mbstring \
    php8-xml \
    # Install Node.js and npm for the Vite/React build
    nodejs \
    npm \
    # Install other tools needed for deployment/storage
    git

# 3. Set Working Directory
WORKDIR /app

# 4. Copy Code (for build steps)
COPY . /app

# 5. Run PHP and Node Build Steps
# Run Composer install
RUN composer install --no-dev --optimize-autoloader

# Run NPM install and Vite build
RUN npm install
RUN npm run build

# 6. Configure Runtime
# Expose the port for FPM
EXPOSE 9000

# Set the entrypoint to a web server (e.g., Nginx or Caddy)
# For simplicity with Render, we often use an existing web server config.
# Since Render's native PHP service uses heroku-php-apache2, if you want
# to stick to Docker, you'll need to define the server yourself.
# A simple entrypoint:
CMD ["php-fpm"]
