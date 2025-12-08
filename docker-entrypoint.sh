#!/bin/bash
set -e

echo "📂 Running migrations..."
php artisan migrate --force

echo "🔥 Clearing caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "🚀 Starting Apache..."
exec apache2-foreground
