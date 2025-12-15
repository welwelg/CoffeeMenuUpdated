#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Build Frontend Assets
npm install
npm run build

# Cache Configuration
php artisan config:cache
php artisan event:cache
php artisan route:cache
php artisan view:cache

# Run Migrations (Optional - usually safer to run manually or in a separate step, but convenient here)
# php artisan migrate --force
