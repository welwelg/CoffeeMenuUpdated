<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoffeeMenu extends Model
{
    protected $fillable = [
        'name',
        'price',
        'description',
        'img',
        'image_url'
    ];
}
