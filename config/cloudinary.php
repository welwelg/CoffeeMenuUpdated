<?php

return [
    CloudinaryLabs\CloudinaryLaravel\CloudinaryServiceProvider::class,

    /*php artisan config:clear
    |--------------------------------------------------------------------------
    | Cloudinary Configuration
    |--------------------------------------------------------------------------
    */

    // It's okay to leave this null if you use the specific keys below
    'cloud_url' => env('CLOUDINARY_URL'),

    /*
    |--------------------------------------------------------------------------
    | Cloudinary Credentials (REQUIRED)
    |--------------------------------------------------------------------------
    | The error occurs because these 3 keys were missing in your previous file.
    */
    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
    'api_key'    => env('CLOUDINARY_API_KEY'),
    'api_secret' => env('CLOUDINARY_API_SECRET'),

    /*
    |--------------------------------------------------------------------------
    | Upload Preset
    |--------------------------------------------------------------------------
    */
    'upload_preset' => env('CLOUDINARY_UPLOAD_PRESET'),

    'notification_url' => env('CLOUDINARY_NOTIFICATION_URL'),

    'secure' => true,
];
