#!/bin/bash

# Exit on fail
set -e

# Wait for the database (optional, but good practice)
# sleep 10

echo "📂 Running migrations..."
php artisan migrate --force

echo "🔥 Clearing caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "🚀 Starting Apache..."
# Ito ang magpapatakbo ng web server (built-in sa image na gamit mo)
exec apache2-foreground
