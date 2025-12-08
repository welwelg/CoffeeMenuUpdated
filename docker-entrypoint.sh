#!/bin/bash
set -e

echo "🚀 Clearing Cache..."
php artisan optimize:clear

echo "🚀 Running Migrations..."
php artisan migrate --force

echo "☕ Starting Server..."
exec apache2-foreground
