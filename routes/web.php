<?php

use App\Http\Controllers\CoffeeMenuController;
use App\Models\CoffeeMenu;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $coffeemenu = CoffeeMenu::all();
    return Inertia::render('welcome', ['coffeemenu' => $coffeemenu]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard - now uses CoffeeMenuController
    Route::get('dashboard', [CoffeeMenuController::class, 'dashboard'])->name('dashboard');

    // Coffee Menu CRUD
    Route::get('coffee-menu', [CoffeeMenuController::class, 'index'])->name('coffee-menu.index');
    Route::get('coffee-menu/create', [CoffeeMenuController::class, 'create'])->name('coffee-menu.create');
    Route::post('coffee-menu', [CoffeeMenuController::class, 'store'])->name('coffee-menu.store');
    Route::get('coffee-menu/{coffeemenu}', [CoffeeMenuController::class, 'show'])->name('coffee-menu.show'); // Added this missing route
    Route::get('coffee-menu/{coffeemenu}/edit', [CoffeeMenuController::class, 'edit'])->name('coffee-menu.edit');
    Route::put('coffee-menu/{coffeemenu}', [CoffeeMenuController::class, 'update'])->name('coffee-menu.update');
    Route::delete('coffee-menu/{coffeemenu}', [CoffeeMenuController::class, 'destroy'])->name('coffee-menu.destroy');

    // Best Seller
    Route::get('best-seller', [CoffeeMenuController::class, 'bestSeller'])->name('best-seller');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
