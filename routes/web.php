<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\Checkrole;
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

Route::middleware(Checkrole::class)->group(function () {
    Route::get('/category', function (){
        $user = Auth::user();
        return Inertia::render('CategoryView');
    })->middleware(['auth', 'verified'])->name('category');
    Route::get('/product', function (){
        $user = Auth::user();
        return Inertia::render('ProductView');
    })->middleware(['auth', 'verified'])->name('product');
    
});
Route::get('/checkout', function (){
    $user = Auth::user();
    return Inertia::render('Checkout');
})->middleware(['auth', 'verified'])->name('category');
Route::get('/single/product/{id}', function ($id) {
    $user = Auth::user();
    return Inertia::render('SingleProduct');
})->middleware(['auth', 'verified'])->name('single.product.show');

Route::get('/view/cart/{id}', function ($id) {
    $user = Auth::user();
    return Inertia::render('ViewCart');
})->middleware(['auth', 'verified'])->name('view.cart.show');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
