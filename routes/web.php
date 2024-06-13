<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/product', function (){
    $user = Auth::user();
    return Inertia::render('ProductView');
})->middleware(['auth', 'verified'])->name('product');

Route::get('/single/product/{id}', function ($id) {
    $user = Auth::user();
    return Inertia::render('SingleProduct');
})->middleware(['auth', 'verified'])->name('single.product.show');

Route::get('/view/card/{id}', function ($id) {
    $user = Auth::user();
    return Inertia::render('ViewCard');
})->middleware(['auth', 'verified'])->name('view.card.show');

Route::get('/category', function (){
    $user = Auth::user();
    return Inertia::render('CategoryView');
})->middleware(['auth', 'verified'])->name('category');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
